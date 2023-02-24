// http://localhost:4000/api/properties?page=1&limit=12&search=kkdjkadd&sort=-1
export const filitersModels = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
    const search = req.query.search || model;
    const SearchResult = new RegExp("^" + search + "$", "i");
    let sortby = parseInt(req.query.sort) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let match = {};
    const results = {};

    results.totalCount = await model.countDocuments().exec();
    results.totalPages = Math.ceil(results.totalCount / limit);
    if (req.query.page) {
      if (endIndex < (await model.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
    }

    if (req.query.propertyType) {
      match.$or = [
        {
          propertyType: req.query.propertyType,
        },
      ];
    }
    if (req.query.category) {
      match.$or = [
        {
          category: req.query.category,
        },
      ];
    }

    if (req.query.view) {
      match.$or = [
        {
          view: req.query.view,
        },
      ];
    }

    if (req.query.price) {
      let price = parseInt(req.query.price);
      match.$or = [
        {
          price: { $gte: price },
        },
      ];
    }
    if (req.query.bathrooms) {
      let bathrooms = parseInt(req.query.bathrooms);
      match.$or = [
        {
          bathrooms: { $gte: bathrooms },
        },
      ];
    }
    if (req.query.bedrooms) {
      let bedrooms = parseInt(req.query.bedrooms);
      match.$or = [
        {
          bedrooms: { $gte: bedrooms },
        },
      ];
    }
    // if (req.query.search) {
    //   match.$or = [
    //     {
    //       title: SearchResult,
    //     },
    //   ];
    // }

    try {
      let pipline = [
        { $match: match },
        // { $limit: limit },
        { $sort: { createdAt: sortby } },
        // { $skip: startIndex },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },

        {
          $set: {
            user: {
              $arrayElemAt: ["$user", 0],
            },
          },
        },
        {
          $project: {
            "user.password": 0,
          },
        },
        {
          $facet: {
            metadata: [
              { $count: "total" },
              {
                $addFields: {
                  total_Pages: results.totalPages,
                  per_page: limit,
                  page: page,
                  // next: results.next,
                  // previous: results.previous,
                },
              },
            ],
            data: [{ $skip: startIndex }, { $limit: limit }],
          },
        },
      ];

      const Modals = await model.aggregate(pipline).exec();

      results.results = Modals;
      results.resultCount = results.results.length;
      res.paginatedResults = results;
      next();
    } catch (error) {
      let response = {
        statuscode: 400,
        errors: error,
        error: [error],
        message: "something failed",
      };
      return res.status(response.statuscode).json(response);
    }
  };
};
// .find({ title: SearchResult })
// .populate("country")
// .populate("user", "-password")
// .where("propertyType")
// .equals(propertyType)
// .limit(limit)
// .sort({ createdAt: sortby })
// .skip(startIndex)
// .exec();

// .limit(limit)
// .sort({ createdAt: sortby })
// .skip(startIndex)
// .exec();
// .populate("country")
// .populate("user", "-password");

// .find({ title: SearchResult })
// .populate("country")
// .populate("user", "-password")
// .where("propertyType")
// .equals(propertyType)
// .limit(limit)
// .sort({ createdAt: sortby })
// .skip(startIndex)
// .exec();
// .unwind('-$user.password')
// .populate("country")
// .populate("user", "-password")
// .limit(limit)
// .sort({ createdAt: sortby })
// .skip(startIndex);

// .aggregate(pipline)
// results.results

// results.results = await countries.populate(Modals, { path: "country" });
// results.results = await users.populate(Modals, {
//   path: "user",
//   select: ["-password"],
// });

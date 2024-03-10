// http://localhost:4000/api/properties?page=1&limit=12&search=kkdjkadd&sort=-1
export const filitersModels = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
    // const search = req.query.search || model;
    const search = req.query.search;
    const SearchResult = new RegExp("^" + search + "$", "i");
    let sortby = parseInt(req.query.sort) || -1;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let match = {};
    let results = {};

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

    // Adjust startIndex based on the exact query value for price, bathrooms, and bedrooms
    if (match.price && req.query.price) {
      startIndex = Math.max(
        startIndex,
        await model
          .countDocuments({ price: { $lt: parseInt(req.query.price) } })
          .exec()
      );
    }
    if (match.bathrooms && req.query.bathrooms) {
      startIndex = Math.max(
        startIndex,
        await model
          .countDocuments({ bathrooms: { $lt: parseInt(req.query.bathrooms) } })
          .exec()
      );
    }
    if (match.bedrooms && req.query.bedrooms) {
      startIndex = Math.max(
        startIndex,
        await model
          .countDocuments({ bedrooms: { $lt: parseInt(req.query.bedrooms) } })
          .exec()
      );
    }
    const queryParams = [
      "propertyType",
      "listingType",
      "category",
      "view",
      "price",
      "bathrooms",
      "bedrooms",
    ];

    queryParams.forEach((param) => {
      if (req.query[param]) {
        switch (param) {
          case "price":
            match[param] = req.query[param];
            break;
          case "bathrooms":
          case "bedrooms":
            const value = parseInt(req.query[param]);
            match[param] = match[param] || {}; // Ensure match[param] exists
            match[param].$gte = value; // Start from the specified value
            break;
          default:
            match[param] = req.query[param];
            break;
        }
      }
    });

    try {
      let pipeline = [
        { $match: match },
        {
          $match: {
            $or: [
              { title: { $regex: search || "", $options: "i" } },
              { description: { $regex: search || "", $options: "i" } },
            ],
          },
        },
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

      const Modals = await model.aggregate(pipeline).exec();

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

// const queryParams = [
//   "propertyType",
//   "listingType",
//   "category",
//   "view",
//   "price",
//   "bathrooms",
//   "bedrooms",
// ];

// queryParams.forEach((param) => {
//   if (req.query[param]) {
//     switch (param) {
//       case "price":
//       case "bathrooms":
//       case "bedrooms":
//         match[param] = { $gte: parseInt(req.query[param]) };
//         break;
//       default:
//         match[param] = req.query[param];
//         break;
//     }
//   }
// });

// if (req.query.propertyType) {
//   match.$or = [
//     {
//       propertyType: req.query.propertyType,
//     },
//   ];
// }
// if (req.query.listingType) {
//   match.$or = [
//     {
//       listingType: req.query.listingType,
//     },
//   ];
// }
// if (req.query.category) {
//   match.$or = [
//     {
//       category: req.query.category,
//     },
//   ];
// }

// if (req.query.view) {
//   match.$or = [
//     {
//       view: req.query.view,
//     },
//   ];
// }

// if (req.query.price) {
//   let price = parseInt(req.query.price);

//   match.$or = [
//     {
//       price: { $gte: price },
//     },
//   ];
// }
// if (req.query.bathrooms) {
//   let bathrooms = parseInt(req.query.bathrooms);
//   match.$or = [
//     {
//       bathrooms: { $gte: bathrooms },
//     },
//   ];
// }
// if (req.query.bedrooms) {
//   let bedrooms = parseInt(req.query.bedrooms);
//   match.$or = [
//     {
//       bedrooms: { $gte: bedrooms },
//     },
//   ];
// }

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
// if (req.query.search) {
//   match.$or = [
//     {
//       title: SearchResult,
//     },
//   ];
// }
// const queryParams = {
//   propertyType: "propertyType",
//   listingType: "listingType",
//   category: "category",
//   view: "view",
//   price: (value) => ({ price: { $gte: parseInt(value) } }),
//   bathrooms: (value) => ({ bathrooms: { $gte: parseInt(value) } }),
//   bedrooms: (value) => ({ bedrooms: { $gte: parseInt(value) } }),
// };

// Object.keys(queryParams).forEach((param) => {
//   if (req.query[param]) {
//     const filter =
//       typeof queryParams[param] === "function"
//         ? queryParams[param](req.query[param])
//         : { [param]: req.query[param] };
//     Object.assign(match, filter);
//   }
// });

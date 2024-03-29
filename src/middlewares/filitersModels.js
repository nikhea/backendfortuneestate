export const filitersModels = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
    const search = req.query.search;
    const SearchResult = new RegExp("^" + search + "$", "i");
    let sortby = parseInt(req.query.sort) || -1;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let match = {};
    let results = {};

    results.totalCount = await model.countDocuments().exec();
    // results.totalPages = Math.ceil(results.totalCount);
    // results.totalPages = Math.ceil(results.totalCount / limit);
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
            match[param] = match[param] || {};
            match[param].$gte = value;
            break;
          default:
            match[param] = req.query[param];
            break;
        }
      }
    });
    results.totalCount = await model.countDocuments(match).exec();
    results.totalPages = Math.ceil(results.totalCount / limit);

    try {
      let pipeline = [
        { $match: match },
        {
          $match: {
            $or: [
              { title: { $regex: search || "", $options: "i" } },
              { description: { $regex: search || "", $options: "i" } },
              { address: { $regex: search || "", $options: "i" } },
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

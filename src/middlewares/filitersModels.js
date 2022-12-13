// http://localhost:4000/api/properties?page=1&limit=12&search=kkdjkadd&sort=-1
export const filitersModels = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const search = req.query.search || model;
    const propertyType = req.query.propertyType || model;
    let sortby = parseInt(req.query.sort) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    results.totalCount = await model.count();
    console.log(results.total);
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
    try {
      // title: SearchResult,
      const SearchResult = new RegExp("^" + search + "$", "i");
      results.results = await model
        .find({ title: SearchResult })
        .populate("country")
        .populate("user", "-password")
        // .where("propertyType")
        // .equals(propertyType)
        .limit(limit)
        .sort({ createdAt: sortby })
        .skip(startIndex)
        .exec();
      results.resultCount = results.results.length;
      res.paginatedResults = results;
      next();
    } catch (error) {
      let response = {
        statuscode: 400,
        error: [error],
        message: "something failed",
      };
      return res.status(response.statuscode).json(response);
    }
  };
};

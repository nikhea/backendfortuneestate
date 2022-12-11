export const filitersModels = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.total = await model.count();
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
      results.results = await model
        .find()

        .populate("country")
        .populate("user", "-password")
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
   
      next();
    } catch (e) {
      let response = {
        statuscode: 400,
        error: [error],
        message: "something failed",
      };
      return res.status(response.statuscode).json(response);
    }
  };
};

// try {
//   let properties = await Properties.find()
//     .populate("country")
//     .populate("user", "-password");
//   let response = {
//     success: "true",
//     statuscode: 200,
//     data: properties,
//     message: "success",
//   };
//   res.json(response);
// } catch (error) {
//   let response = {
//     statuscode: 400,
//     data: [],
//     error: [error],
//     message: "something failed",
//   };
//   return res.json(response);
// }

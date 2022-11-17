import Continents from "../models/continent.model.js";

export const getContinents = async (req, res, next) => {
  try {
    let continents = await Continents.find();
    let response = {
      success: "true",
      statuscode: 200,
      data: continents,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    console.error(error.message);
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

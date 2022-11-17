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

export const createContinents = async (req, res, next) => {
  try {
    let continents = new Continents({
      name: req.body.name,
      bgImage: req.body.bgImage,
      image: req.body.image,
    });
    console.log(continents + " continents");
    await continents.save();
    if (continents) {
      let response = {
        success: "true",
        statuscode: 200,
        data: continents,
        message: "success",
      };
      res.json(response);
    }
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
export const getOneContinents = async (req, res, next) => {
  const id = req.params.id;
  try {
    let continents = await Continents.findById(id);
    console.log(id + " id");
    console.log(continents + " continents");
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

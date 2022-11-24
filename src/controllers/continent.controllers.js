import Continents from "../models/continent.model.js";

export const getContinents = async (req, res, next) => {
  try {
    let continents = await Continents.find().populate("countries");
    let response = {
      success: "true",
      statuscode: 200,
      data: continents,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

export const createContinent = async (req, res, next) => {
  try {
    let continents = new Continents({
      name: req.body.name,
      bgImage: req.body.bgImage,
      image: req.body.image,
    });
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
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};
export const getOneContinent = async (req, res, next) => {
  const id = req.params.id;
  try {
    let continent = await Continents.findById(id).populate("countries");

    let response = {
      success: "true",
      statuscode: 200,
      data: continent,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};
export const UpdateOneContinent = async (req, res, next) => {
  const id = req.params.id;
  try {
    const continent = await Continents.findById(id);
    if (!continent) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "something failed",
      };
      return res.json(response);
    }
    const updatedContinent = await Continents.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    let response = {
      success: "true",
      statuscode: 200,
      data: updatedContinent,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};
export const removeOneContinent = async (req, res, next) => {
  const id = req.params.id;
  try {
    let continents = await Continents.findById(id);
    await continents.remove();
    let response = {
      success: "true",
      statuscode: 200,
      data: continents,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

import Countries from "../models/country.model.js";
import Continents from "../models/continent.model.js";
export const getCountries = async (req, res, next) => {
  try {
    let countries = await Countries.find().populate("continent");
    let response = {
      success: "true",
      statuscode: 200,
      data: countries,
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

export const createCountry = async (req, res, next) => {
  const ContinentsName = req.params.name;
  const p = new RegExp("^" + ContinentsName + "$", "i");
  console.log(p);
  try {
    const continent = await Continents.findOne({ name: p });
    console.log(continent);
    if (continent) {
      const Countrys = new Countries({
        name: req.body.name,
        description: req.body.description,
        bgImage: req.body.bgImage,
        image: req.body.image,
      });
      const countrys = await Countrys.save();
      continent.countries.push(countrys);
      await continent.save();
      let response = {
        success: "true",
        statuscode: 200,
        data: countrys,
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
export const getOneCountry = async (req, res, next) => {
  const id = req.params.id;
  try {
    let country = await Countries.findById(id);

    let response = {
      success: "true",
      statuscode: 200,
      data: country,
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
export const UpdateOneCountry = async (req, res, next) => {
  const id = req.params.id;
  try {
    const country = await Countries.findById(id);
    if (!country) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "something failed",
      };
      return res.json(response);
    }
    const updatedCountry = await Countries.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    let response = {
      success: "true",
      statuscode: 200,
      data: updatedCountry,
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
export const removeOneCountry = async (req, res, next) => {
  const id = req.params.id;
  try {
    let country = await Countries.findById(id);
    await country.remove();
    let response = {
      success: "true",
      statuscode: 200,
      data: country,
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

import Countries from "../models/country.model.js";
import Continents from "../models/continent.model.js";
export const getCountries = async (req, res, next) => {
  try {
    let countries = await Countries.find().populate("continent");
    console.log(countries);
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

  const CountryName = new RegExp("^" + req.body.name + "$", "i");
  try {
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.bgImage ||
      !req.body.image ||
      !ContinentsName
    ) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "please enter all fields",
      };
      return res.json(response);
    }
    const exsitCountries = await Continents.findOne({ name: CountryName });
    if (exsitCountries) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "country already exists",
      };
      return res.json(response);
    }
    const continent = await Continents.findOne({ name: p });
    if (continent) {
      const Countrys = new Countries({
        name: req.body.name,
        description: req.body.description,
        bgImage: req.body.bgImage,
        image: req.body.image,
        continent: continent._id,
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
    const p = new RegExp("^" + req.params.name + "$", "i");
    let country = await Countries.findOne({ name: p }).populate("continent");
    // console.log(...Countries);
    // let country = await Countries.findById(id);

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

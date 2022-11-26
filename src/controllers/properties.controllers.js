import Properties from "../models/properties.modal.js";
import Countries from "../models/country.model.js";
export const removeOneCountry = async (req, res, next) => {
  const id = req.params.id;
  try {
    let property = await Properties.findById(id);
    await property.remove();
    let response = {
      success: "true",
      statuscode: 200,
      data: property,
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

import Properties from "../models/properties.model.js";
import Countries from "../models/country.model.js";
export const getProperties = async (req, res, next) => {
  try {
    let properties = await Properties.find().populate("country");
    console.log(properties);
    let response = {
      success: "true",
      statuscode: 200,
      data: properties,
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
export const createProperties = async (req, res, next) => {
  const CountryName = req.params.name;
  const p = new RegExp("^" + CountryName + "$", "i");
  console.log(p);
  try {
    const country = await Countries.findOne({ name: p });
    console.log(country);
    if (country) {
      const Property = new Properties({
        title: req.body.title,
        pageTitle: req.body.pageTitle,
        description: req.body.description,
        category: req.body.category,
        propertyType: req.body.propertyType,
        listingType: req.body.listingType,
        view: req.body.view,
        price: req.body.price,
        priceSymbol: req.body.priceSymbol,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        halfBathrooms: req.body.halfBathrooms,
        squareFootage: req.body.squareFootage,
        squareSymbol: req.body.squareSymbol,
        yearBuilt: req.body.yearBuilt,
        lotArea: req.body.lotArea,
        lotAreaSymbol: req.body.lotAreaSymbol,
        images: req.body.images,
        image: req.body.image,
        address: {
          country: req.body.country,
          street: req.body.street,
          city: req.body.city,
        },
        country: country._id,
      });
      const property = await Property.save();
      //   continent.countries.push(countrys);
      country.properties.push(property);
      await country.save();
      let response = {
        success: "true",
        statuscode: 200,
        data: property,
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
export const getOneProperty = async (req, res, next) => {
  const id = req.params.id;
  try {
    //   const p = new RegExp("^" + req.params.name + "$", "i");
    //   let country = await Countries.findOne({ name: p }).populate("continent");
    let property = await Properties.findById(id).populate("country");
    // if (property) {
    let response = {
      success: "true",
      statuscode: 200,
      data: property,
      message: "success",
    };
    res.json(response);
    // }
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
export const UpdateOneProperty = async (req, res, next) => {
  const id = req.params.id;
  try {
    const property = await Properties.findById(id);
    if (!property) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "something failed",
      };
      return res.json(response);
    }
    const updatedProperty = await Properties.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    let response = {
      success: "true",
      statuscode: 200,
      data: updatedProperty,
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
export const removeOneProperty = async (req, res, next) => {
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

import Properties from "../models/properties.model.js";
import Countries from "../models/country.model.js";
import { filitersModels } from "../middlewares/filitersModels.js";
import { cloudinaryUploads } from "../cloudinary/cloudinary.js";
import { uploadPropertiesImage } from "../middlewares/uploadImage.js";
import { nanoid } from "nanoid";

const idLength = 8;
export const getProperties = async (req, res, next) => {
  try {
    const properties = res.paginatedResults;
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
  let PropertiesUrls;
  // const CountryName = req.params.name;
  // const p = new RegExp("^" + CountryName + "$", "i");

  try {
    if (!req.body.country)
      res.status(404).json({ message: "Invalid country name" });

    const country = await Countries.findOne({ name: req.body.country });
    if (country) {
      // PropertiesUrls = await uploadPropertiesImage(req);
      const Property = new Properties({
        title: req.body.title,
        pageTitle: req.body.pageTitle,
        description: req.body.description,
        category: req.body.category,
        propertyType: req.body.propertyType,
        listingID: nanoid(idLength),
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
        propertyImages: req.body.propertyImages,
        // image: req.body.image,
        isLiked: req.body.isLiked,
        address: {
          country: country.name,
          street: req.body.street,
          city: req.body.city,
        },
        websiteCopy: {
          webSiteURL: req.body.webSiteURL,
          webSiteName: req.body.webSiteName,
        },
        country: country._id,
        user: req.user.id,
      });
      const property = await Property.save();
      country.properties.push(property);
      await country.save();
      let response = {
        success: "true",
        statuscode: 200,
        data: property,
        message: "property created successfully",
      };
      res.json(response);
    } else {
      let response = {
        // success: "",
        statuscode: 400,
        message: "country does not exist",
      };
      res.status(response.statuscode).json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      error: [error],
      message: "something failed ssssssssssss " + error,
    };
    return res.status(response.statuscode).json(response);
  }
  //   continent.countries.push(countrys);
};
export const OwnOneProperty = async (req, res, next) => {
  const user = req.user.id;

  try {
    let property = await Properties.find({ user: user })
      .populate("country")
      .populate("user", "-password");
    if (property) {
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
export const getSingerUserProperties = async (req, res, next) => {
  const user = req.params.userId;
  try {
    let property = await Properties.find({ user: user })
      .populate("country")
      .populate("user", "-password");
    if (property) {
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
    let property = await Properties.findById(id)
      .populate("country")
      .populate("user", "-password");
    if (!property) {
      let response = {
        success: "true",
        statuscode: 400,
        // data: property,
        message: "property does not exist",
      };
      res.json.status(response.statuscode).json(response);
    } else if (property) {
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
      error: [error],
      message: "something failed ",
    };
    return res.json(response);
  }
};

export const getOnePropertyByName = async (req, res, next) => {
  const { name, id } = req.params;
  // const { id } = req.body;

  try {
    if (!id) {
      let response = {
        success: false,
        statuscode: 400,
        message: "property id not passed",
      };
      return res.status(response.statuscode).json(response);
    }
    let property = await Properties.findOne({
      _id: id,
      title: name,
    })
      .populate("country")
      .populate("user", "-password");
    if (!property) {
      let response = {
        success: false,
        statuscode: 400,
        // data: property,
        message: "property does not exist",
      };
      return res.status(response.statuscode).json(response);
    } else if (property) {
      let response = {
        success: true,
        statuscode: 200,
        data: property,
        message: "success",
      };
      return res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      error: [error],
      message: "something failed ",
    };
    return res.json(response);
  }
};
export const getPropertyofCountry = async (req, res, next) => {
  const name = req.params.name;
  try {
    const p = new RegExp("^" + req.params.name + "$", "i");
    let country = await Countries.findOne({ name: p });
    if (country) {
      let property = await Properties.find()
        .where("address.country")
        .equals(country.name)
        .populate("country")
        .populate("user", "-password");

      if (property.length != 0) {
        let response = {
          success: "true",
          statuscode: 200,
          data: property,
          message: "success ",
        };
        res.json(response);
      } else {
        let response = {
          success: "true",
          statuscode: 404,
          data: [],
          message:
            "no properties in this country yet please register/ login as an agent to add a properties",
        };
        res.json(response);
      }
    } else {
      let response = {
        success: "true",
        statuscode: 404,
        data: "country does not exist",
        message: "country does not exist",
      };
      res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      error: error,
      message: "something failed",
    };
    return res.json(response);
  }
};
export const UpdateLikeProperty = async (req, res, next) => {
  const { isLiked } = req.body;
  // const user = req.user.id;
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
    const updatedLike = await Properties.findByIdAndUpdate(
      id,
      {
        $set: {
          isLiked: isLiked,
        },
      },
      {
        new: true,
      }
    );
    let response = {
      success: "true",
      statuscode: 200,
      data: updatedLike,
      message: "property Updated successfully",
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
      message: "property Updated successfully",
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
    const deleteProperty = await property.remove();
    if (deleteProperty) {
      let response = {
        success: "true",
        statuscode: 200,
        message: "property deleted successfully",
      };
      res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

import express from "express";
import {
  getProperties,
  createProperties,
  getOneProperty,
  getPropertyofCountry,
  UpdateOneProperty,
  removeOneProperty,
} from "../controllers/properties.controllers.js";
const router = express.Router();
// @route     GET api/properties
// @desc      Get  all properties
//@access     all
//role        admin
router.get("/properties", getProperties);
// @route     POST api/continent
// @desc      create a new continent
//@access     Private
//role        admin || agent
router.post("/:name/properties", createProperties);

// @route     POST api/continent
// @desc      create a new continent
//@access     private
//role        admin
router.put("/properties/:id", UpdateOneProperty);

// @route     GET api/properties
// @desc      Get  all properties
//@access     all
//role        admin
router.get("/properties/:id", getOneProperty);

// @route     GET api/properties
// @desc      Get  all properties of A COUNTRY
//@access     all
//role        admin

router.get("/:name/properties", getPropertyofCountry);
// @route     DELETE api/properties/:id
// @desc      delete one properties
//@access     private
//role        admin || agent
router.delete("/properties/:id", removeOneProperty);
export default router;

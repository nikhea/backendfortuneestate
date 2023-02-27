import express from "express";
import {
  getProperties,
  createProperties,
  OwnOneProperty,
  getSingerUserProperties,
  getOneProperty,
  getPropertyofCountry,
  UpdateOneProperty,
  UpdateLikeProperty,
  removeOneProperty,
} from "../controllers/properties.controllers.js";
import { loginRequired } from "../middlewares/authtication.js";
import { filitersModels } from "../middlewares/filitersModels.js";

import {
  ensureAgent,
  ensureBothAdminAndAgent,
} from "../middlewares/roleValidation.js";
import Properties from "../models/properties.model.js";
import upload from "../imageServices/multer.js";

const router = express.Router();
// @route     GET api/properties
// @desc      Get  all properties
//@access     all
router.get("/properties", filitersModels(Properties), getProperties);
// @route     GET api/properties
// @desc      Get  all properties
//@access     all
router.get("/properties/user/:userId", getSingerUserProperties);
// @route     GET api/properties
// @desc      Get  all properties
//@access     all
router.get("/properties/me", loginRequired, ensureAgent, OwnOneProperty);

// @route     POST api/continent
// @desc      create a new continent
//@access     Private
router.post(
  "/properties",
  loginRequired,
  ensureAgent,
  // upload.array("propertyImages", 3),
  createProperties
);

// @route     POST api/continent
// @desc      create a new continent
//@access     private
//role        admin
router.put(
  "/properties/:id",
  loginRequired,
  ensureBothAdminAndAgent,
  UpdateOneProperty
);

// @route     POST api/continent
// @desc      create a new continent
//@access     Private
router.put("/properties/:id/like", loginRequired, UpdateLikeProperty);

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
router.delete(
  "/properties/:id",
  loginRequired,
  ensureBothAdminAndAgent,
  removeOneProperty
);
export default router;

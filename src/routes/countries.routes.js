import express from "express";
import {
  getCountries,
  createCountry,
  getOneCountry,
  UpdateOneCountry,
  removeOneCountry,
} from "../controllers/countries.controllers.js";
import { loginRequired } from "../middlewares/authtication.js";
import { ensureAdmin } from "../middlewares/roleValidation.js";
const router = express.Router();
// @route     GET api/continent
// @desc      Get  all continents
//@access     private
//role        admin
router.get("/countries",  getCountries);

// @route     POST api/continent
// @desc      create a new continent
//@access     Private
//role        admin
router.post("/:name/countries", loginRequired, ensureAdmin, createCountry);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.get("/countries/:name", getOneCountry);

// @route     POST api/continent
// @desc      create a new continent
//@access     private
//role        admin
router.put("/countries/:id", loginRequired, ensureAdmin, UpdateOneCountry);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.delete("/countries/:id", loginRequired, ensureAdmin, removeOneCountry);

export default router;

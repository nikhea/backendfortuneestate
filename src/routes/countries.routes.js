import express from "express";
import {
  getCountries,
  createCountry,
  getOneCountry,
  UpdateOneCountry,
  removeOneCountry,
} from "../controllers/countries.controllers.js";
const router = express.Router();
// @route     GET api/continent
// @desc      Get  all continents
//@access     private
//role        admin
router.get("/countries", getCountries);

// @route     POST api/continent
// @desc      create a new continent
//@access     Private
//role        admin
router.post("/:name/countries", createCountry);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.get("/countries/:id", getOneCountry);

// @route     POST api/continent
// @desc      create a new continent
//@access     private
//role        admin
router.put("/countries/:id", UpdateOneCountry);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.delete("/countries/:id", removeOneCountry);

export default router;

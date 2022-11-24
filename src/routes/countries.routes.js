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
router.get("/", getCountries);

// @route     POST api/continent
// @desc      create a new continent
//@access     Private
//role        admin
router.post("/", createCountry);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.get("/:id", getOneCountry);

// @route     POST api/continent
// @desc      create a new continent
//@access     private
//role        admin
router.put("/:id", UpdateOneCountry);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.delete("/:id", removeOneCountry);

export default router;

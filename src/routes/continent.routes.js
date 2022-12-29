import express from "express";
import {
  getContinents,
  createContinent,
  getOneContinent,
  UpdateOneContinent,
  removeOneContinent,
} from "../controllers/continent.controllers.js";
import { loginRequired } from "../middlewares/authtication.js";
import { ensureAdmin } from "../middlewares/roleValidation.js";
const router = express.Router();
// @route     GET api/continent
// @desc      Get  all continents
//@access     private
//role        admin
router.get("/", getContinents);

// @route     POST api/continent
// @desc      create a new continent
//@access     Private
//role        admin
router.post(
  "/",
  //  loginRequired, ensureAdmin,
  createContinent
);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.get("/:name", getOneContinent);

// @route     POST api/continent
// @desc      create a new continent
//@access     private
//role        admin
router.put("/:id", loginRequired, ensureAdmin, UpdateOneContinent);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.delete("/:id", loginRequired, ensureAdmin, removeOneContinent);

export default router;

import express from "express";
import {
  getContinents,
  createContinent,
  getOneContinent,
  UpdateOneContinent,
  removeOneContinent,
} from "../controllers/continent.controllers.js";
const router = express.Router();
// @route     GET api/continent
// @desc      Get  all continents
//@access     Public
router.get("/", getContinents);

// @route     POST api/continent
// @desc      create a new continent
//@access     Public
router.post("/", createContinent);

// @route     GET api/continent
// @desc      GET one continent
//@access     Public
router.get("/:id", getOneContinent);

// @route     POST api/continent
// @desc      create a new continent
//@access     Public
router.put("/:id", UpdateOneContinent);

// @route     GET api/continent
// @desc      GET one continent
//@access     Public
router.delete("/:id", removeOneContinent);

export default router;

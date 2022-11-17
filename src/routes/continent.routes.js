import express from "express";
import {
  getContinents,
  createContinents,
  getOneContinents,
} from "../controllers/continent.controllers.js";
const router = express.Router();
// @route     GET api/continent
// @desc      Get  all continents
//@access     Public
router.get("/", getContinents);

// @route     POST api/continent
// @desc      create a new continent
//@access     Public
router.post("/", createContinents);

// @route     GET api/continent
// @desc      GET one continent
//@access     Public
router.get("/:id", getOneContinents);

export default router;

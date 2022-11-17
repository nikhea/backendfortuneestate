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
//@access     private
//role        admin
router.get("/", getContinents);

// @route     POST api/continent
// @desc      create a new continent
//@access     Private
//role        admin
router.post("/", createContinent);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.get("/:id", getOneContinent);

// @route     POST api/continent
// @desc      create a new continent
//@access     private
//role        admin
router.put("/:id", UpdateOneContinent);

// @route     GET api/continent
// @desc      GET one continent
//@access     private
//role        admin
router.delete("/:id", removeOneContinent);

export default router;

import express from "express";
import { getContinents } from "../controllers/continent.controllers.js";
const router = express.Router();
// @route     GET api/continent
// @desc      Get logged in user
//@access     Public
router.get("/", getContinents);




export default router
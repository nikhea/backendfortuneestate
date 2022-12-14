import express from "express";
import {
  OwnerProfile,
  CreateProfile,
} from "../controllers/profile.controller.js";
import { loginRequired } from "../middlewares/authtication.js";

const router = express.Router();

// @route     POST api/profile
// @desc      get user profile
// @access     authorized user
// role        user
router.get("/me", loginRequired, OwnerProfile);

// @route     POST api/user
// @desc      Add a new user
//@access     admin
//role        admin
router.post("/me", loginRequired, CreateProfile);

export default router;

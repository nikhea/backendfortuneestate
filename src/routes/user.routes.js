import express from "express";
import { getUsers, getMe } from "../controllers/user.controller.js";
import { loginRequired } from "../middlewares/authtication.js";
const router = express.Router();
// @route     GET api/user
// @desc      Get  all users
//@access     private
//role        admin
router.get("/", loginRequired, getUsers);

// @route     GET api/user
// @desc      Get   user thats currencly login
//@access     all
//role        admin
router.get("/me", loginRequired, getMe);
export default router;

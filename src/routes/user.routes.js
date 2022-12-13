import express from "express";
import {
  getUsers,
  getUsersById,
  getMe,
  removeOneUser,
} from "../controllers/user.controller.js";
import { loginRequired } from "../middlewares/authtication.js";
import { ensureAdmin } from "../middlewares/roleValidation.js";
const router = express.Router();
// @route     GET api/user
// @desc      Get  all users
//@access     private
//role        admin
router.get("/", loginRequired, ensureAdmin, getUsers);

// @route     GET api/user
// @desc      Get   user thats currencly login
//@access     all
//role        admin
router.get("/me", loginRequired, getMe);

// @route     GET api/user
// @desc      Get   user ByID
//@access     all
//role        admin
router.get(
  "/:id",
  loginRequired,
  // ensureAdmin,
  getUsersById
);

// @route     DELETE api/user/:id
// @desc      delete one properties
//@access     private
//role        admin
router.delete("/:id", loginRequired, ensureAdmin, removeOneUser);
export default router;

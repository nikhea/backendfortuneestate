import express from "express";
import {
  getUsers,
  getUsersById,
  getMe,
  getAgents,
  getAgentsDetails,
  UpdateOneUser,
  UpdateUserProfile,
  removeOneUser,
} from "../controllers/user.controller.js";
import { loginRequired } from "../middlewares/authtication.js";
import { ensureAdmin } from "../middlewares/roleValidation.js";
import upload from "../imageServices/multer.js";

const router = express.Router();
// @route     GET api/user
// @desc      Get  all users
//@access     private
//role        admin
router.get(
  "/",
  // loginRequired, ensureAdmin,
  getUsers
);

// @route     GET api/user
// @desc      Get   user thats currencly login
//@access     all
//role        admin
router.get("/me", loginRequired, getMe);
// @route     GET api/user
// @desc      Get   user thats currencly login
//@access     all
//role        admin
router.get("/agents", getAgents);
// @route     GET api/user
// @desc      Get   user thats currencly login
//@access     all
//role        admin
router.get("/agents/:agentId", getAgentsDetails);

// @route     GET api/user
// @desc      Get   user ByID
//@access     all
//role        admin
router.get(
  "/:id",
  // loginRequired,
  // ensureAdmin,
  getUsersById
);
// @route     DELETE api/user/:id
// @desc      delete one properties
//@access     private
//role        admin
router.put(
  "/me",
  loginRequired,
  // upload.single("profileImage"),
  // upload.single("bannerImage"),
  // upload.fields([
  //   {
  //     name: "profileImage",
  //     maxCount: 1,
  //   },
  //   {
  //     name: "bannerImage",
  //     maxCount: 1,
  //   },
  // ]),
  UpdateOneUser
);

router.put("/me/profile", loginRequired, UpdateUserProfile);
// @route     DELETE api/user/:id
// @desc      delete one properties
//@access     private
//role        admin
router.delete("/:id", loginRequired, ensureAdmin, removeOneUser);
export default router;

import express from "express";
import { getUsers, createUser, loginUser } from "../controllers/user.controller.js";
const router = express.Router();
// @route     GET api/user
// @desc      Get  all users
//@access     all
//role        admin
router.get("/", getUsers);

// @route     POST api/user
// @desc      Add a new user
//@access     admin
//role        admin
router.post("/signup", createUser);

// @route     POST api/user
// @desc      Add a new user
//@access     admin
//role        admin
router.post("/login", loginUser);

export default router;

import express from "express";
import {createUser, loginUser} from "../controllers/auth.controllers.js";
const router = express.Router();

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

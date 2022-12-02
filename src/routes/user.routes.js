import express from "express";
import { getUsers } from "../controllers/user.controller.js";
const router = express.Router();
// @route     GET api/user
// @desc      Get  all users
//@access     all
//role        admin
router.get("/", getUsers);



export default router;

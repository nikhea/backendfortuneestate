import Properties from "../models/properties.model.js";
import User from "../models/user.model.js";
import { generateJWT } from "./generateJWT.js";
import { nanoid } from "nanoid";
export const createUser = async (req, res) => {
  const idLength = 8;
  const {
    email,
    password,
    firstname,
    lastname,
    username,
    role,
    gender,
    state,
    lag,
    country,
    address,
    phone,
    profileImage,
    bannerImage,
    isVerified,
    uploadCount,
    facebook,
    twitter,
    linkedin,
  } = req.body;
  const userID = nanoid(idLength);
  try {
    if (!email || !password || !firstname || !lastname || !username) {
      let response = {
        statuscode: 400,
        message: "please enter all fields",
      };
      return res.json(response);
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      let response = {
        statuscode: 400,
        message: "User already exists",
      };
      return res.json(response);
    }
    const userNameValidator = await User.findOne({ username });
    if (userNameValidator) {
      let response = {
        statuscode: 400,
        message: "User with this username already exists",
      };
      return res.json(response);
    }
    const user = await User.create({
      email,
      password,
      firstname,
      lastname,
      username,
      userID,
      role,
      profile: {
        gender,
        state,
        lag,
        country,
        address,
        phone,
        profileImage,
        bannerImage,
        isVerified,
        uploadCount,
        facebook,
        twitter,
        linkedin,
      },
    });
    if (user) {
      const userDate = {
        _id: user._id,
        email: user.email,
        userID: user.userID,
        // password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        role: user.role,
        profile: user.profile,
        token: generateJWT(user._id),
      };
      let response = {
        statuscode: 201,
        data: userDate,
        message: "User Created",
      };
      return res.status(201).json(response);
    } else {
      let response = {
        statuscode: 400,
        message: "something failed",
      };
      return res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // if (!email || !password) {
  //   let response = {
  //     statuscode: 400,
  //     message: "invalid credentials",
  //   };
  //   return res.json(response);
  // }
  try {
    const user = await User.findOne({ email });
    let isMatch = await user.comparePassword(password);
    if (isMatch) {
      const userDate = {
        _id: user._id,
        email: user.email,
        userID: user.userID,
        // password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        role: user.role,
        properties: user.properties,
        profile: user.profile,
        token: generateJWT(user._id),
      };
      let response = {
        statuscode: 200,
        data: userDate,
        message: "Login Successful",
      };
      return res.status(response.statuscode).json(response);
    } else {
      let response = {
        statuscode: 400,
        message: "invalid credentials",
      };
      return res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      error: error,
      message: "something failed",
    };
    return res.status(response.statuscode).json(response);
  }
};

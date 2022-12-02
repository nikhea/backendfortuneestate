import jwt from "jsonwebtoken";
import Properties from "../models/properties.model.js";
import User from "../models/user.model.js";
export const createUser = async (req, res) => {
  const { email, password, firstname, lastname, username, role } = req.body;

  try {
    if (!email || !password || !firstname || !lastname || !username || !role) {
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
      role,
    });
    if (user) {
      const userDate = {
        _id: user._id,
        email: user.email,
        // password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        role: user.role,
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
    const { email, password} = req.body;

  try {
    let response = {
      statuscode: 200,
      data: [],
      error: [error],
      message: " Login Successful",
    };
    return res.json(response);
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

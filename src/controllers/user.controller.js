import Properties from "../models/properties.model.js";
import Users from "../models/user.model.js";
export const getUsers = async (req, res, next) => {
  try {
    let users = await Users.find()
      .select("email firstname lastname username role")
      .populate("profile")
      .populate("properties");
    let response = {
      success: "true",
      statuscode: 200,
      data: users,
      message: "success",
    };
    res.json(response);
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

export const UpdateOneUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await Users.findById(id);
    if (!user) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "something failed",
      };
      return res.json(response);
    }
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    let response = {
      success: "true",
      statuscode: 200,
      data: updatedUser,
      message: "success",
    };
    res.json(response);
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
export const removeOneUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    let user = await Users.findById(id);
    await user.remove();
    let response = {
      success: "true",
      statuscode: 200,
      data: user,
      message: "success",
    };
    res.json(response);
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

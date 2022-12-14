import Properties from "../models/properties.model.js";
import Users from "../models/user.model.js";
export const getUsers = async (req, res, next) => {
  try {
    let users = await Users.find()
      // .select("email firstname lastname username role profile")
      .select("-password -properties -__v")
      .populate("profile");
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
export const getMe = async (req, res, next) => {
  try {
    let user = await Users.findById(req.user.id)
      .select("-password -properties")
      .populate("profile");
    // .populate("properties");
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

export const getUsersById = async (req, res, next) => {
  const id = req.params.id;
  try {
    let users = await Users.findById(id)
      .select("email firstname lastname username role")
      .populate("profile");
    // .populate("properties");
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
  const id = req.user.id;
  const {
    // email,
    // password,
    // firstname,
    // lastname,
    // username,
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
    // const userNameValidator = await Users.findOne({ username });
    // if (userNameValidator) {
    //   let response = {
    //     statuscode: 400,
    //     message: "User with this username already exists",
    //   };
    //   return res.json(response);
    // }
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      {
        $set: {
          profile: {
            uploadCount: uploadCount,
            role: role,
            gender: gender,
            state: state,
            lag: lag,
            country: country,
            address: address,
            phone: phone,
            profileImage: profileImage,
            bannerImage: bannerImage,
            isVerified: isVerified,
            facebook: facebook,
            twitter: twitter,
            linkedin: linkedin,
          },
        },
      },
      {
        new: true,
      }
    ).select("-password -properties");
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
    let user = await Users.findById(id).select("-password");
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
      // data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

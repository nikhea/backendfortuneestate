import Properties from "../models/properties.model.js";
import Users from "../models/user.model.js";
import {
  uploadProfileImage,
  uploadBannerImage,
} from "../middlewares/uploadImage.js";
import { cloudinaryRemove } from "../cloudinary/cloudinary.js";

export const getUsers = async (req, res, next) => {
  try {
    let users = await Users.find()
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
export const getAgents = async (req, res, next) => {
  try {
    let user = await Users.find()
      .where("role")
      .equals("AGENT")
      .select("-password -properties")
      .populate("profile");
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
  let ProfileUrls, BannerUrls;
  const id = req.user.id;
  const {
    role,
    gender,
    state,
    lag,
    country,
    address,
    phone,
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

    ProfileUrls = await uploadProfileImage(req);
    BannerUrls = await uploadBannerImage(req);

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      {
        $set: {
          role: role,
          profile: {
            uploadCount: uploadCount,
            role: role,
            gender: gender,
            state: state,
            lag: lag,
            country: country,
            address: address,
            phone: phone,
            profileImage: ProfileUrls,
            bannerImage: BannerUrls,
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
    if (updatedUser) {
      let response = {
        success: "true",
        statuscode: 200,
        data: updatedUser,
        message: "success",
      };
      res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed" + error,
    };
    return res.json(response);
  }
};
export const removeOneUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    let user = await Users.findById(id).select("-password");
    const { public_id: ProfileImageUrl } = user.profile.profileImage;
    const { public_id: BannerImageUrl } = user.profile.bannerImage;
    await cloudinaryRemove(ProfileImageUrl);
    await cloudinaryRemove(BannerImageUrl);

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

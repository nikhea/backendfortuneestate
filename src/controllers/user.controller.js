import Properties from "../models/properties.model.js";
import Users from "../models/user.model.js";
import moment from "moment";
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
export const getAgentsDetails = async (req, res, next) => {
  const id = req.params.agentId;

  try {
    let user = await Users.findById(id)
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
  const id = req.user.id;
  console.log(req.body.ProfileImage);
  const { ProfileImage } = req.body;

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

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      {
        $set: {
          profile: {
            uploadCount: user?.profile?.uploadCount,
            gender: user?.profile?.gender,
            dateOfBirth: user?.profile?.dateOfBirth,
            age: user?.profile?.age,
            state: user?.profile?.state,
            lag: user?.profile?.lag,
            country: user?.profile?.country,
            address: user?.profile?.address,
            city: user?.profile?.phone,
            phone: user?.profile?.phone,
            isVerified: user?.profile?.isVerified,
            instagram: user?.profile?.instagram,
            facebook: user?.profile?.facebook,
            tiwtter: user?.profile?.tiwtter,
            linkedin: user?.profile?.linkedin,
            bio: user?.profile?.bio,
            profileImage: {
              url: ProfileImage.url,
              public_id: ProfileImage.public_id,
              asset_id: ProfileImage.asset_id,
              secure_url: ProfileImage.secure_url,
              thumbnail_url: ProfileImage.thumbnail_url,
            },
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

export const UpdateUserProfile = async (req, res, next) => {
  const id = req.user.id;
  const {
    role,
    data: {
      gender,
      dateOfBirth,
      state,
      lag,
      country,
      address,
      phone,
      isVerified,
      uploadCount,
      city,
      instagram,
      facebook,
      tiwtter,
      linkedin,
      bio,
      postcode,
    },
    // profileImage
  } = req.body;
  console.log(tiwtter, postcode);

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

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      {
        $set: {
          role: role,
          profile: {
            uploadCount: uploadCount,
            role: role,
            gender: gender,
            dateOfBirth: moment.utc(dateOfBirth).format("YYYY-MM-DD"),
            age: moment().diff(moment(dateOfBirth), "years"),
            state: state,
            lag: lag,
            country: country,
            address: address,
            phone: phone,
            city: city,
            isVerified: isVerified,
            instagram: instagram,
            facebook: facebook,
            tiwtter: tiwtter,
            linkedin: linkedin,
            bio: bio,
            postcode: postcode,
            profileImage: {
              url: user?.profile?.profileImage.url,
              public_id: user?.profile?.profileImage.public_id,
              asset_id: user?.profile?.profileImage.asset_id,
              secure_url: user?.profile?.profileImage.secure_url,
              thumbnail_url: user?.profile?.profileImage.thumbnail_url,
            },
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

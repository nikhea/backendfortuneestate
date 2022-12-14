import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
export const OwnerProfile = async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    let profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "-password -properties",
    );
    console.log(profile, "ownproperties");
    if (profile) {
      let response = {
        success: "true",
        statuscode: 200,
        data: profile,
        message: "success",
      };
      res.json(response);
    } else {
      let response = {
        success: "true",
        statuscode: 200,
        data: profile,
        message: "success",
      };
      res.json(response);
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

export const CreateProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      const userProfile = new Profile({
        gender: req.body.gender,
        state: req.body.state,
        lga: req.body.lga,
        country: req.body.country,
        address: req.body.address,
        phone: req.body.phone,
        profile: req.body.profile,
        bannerImage: req.body.bannerImage,
        uploadCount: req.body.uploadCount,
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        user: user._id,
      });
      await userProfile.save();
      let response = {
        success: "true",
        statuscode: 200,
        data: userProfile,
        message: "success",
      };
      res.json(response);
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

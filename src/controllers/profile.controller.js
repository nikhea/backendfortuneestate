import Profile from "../models/profile.model.js";
export const OwnerProfile = async (req, res, next) => {
  const user = req.user.id;
  try {
    let profile = await Profile.findOne({ user: user }).populate(
      "user",
      "-password"
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

import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// make sure user is logged in
exports.loginRequired = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) {
        req.user = await User.findById(decoded.id).select("-password");
        return next();
      } else {
        return next({
          status: 401,
          message: "Not authorized",
        });
      }
    }
  } catch (err) {
    return next({
      status: 401,
      message: "Not authorized",
    });
  }
};

// make sure we get the correct user - Authorization
exports.ensureCorrectUser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized",
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized",
    });
  }
};

import * as mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import { roles } from "../utils/constants.js";
// import ProfileScheme from "./profile.model";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: false,
      max: 100,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address" });
        }
      },
    },
    firstname: {
      type: String,
      required: true,
      lowercase: true,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [roles.admin, roles.agent, roles.subscriber],
      default: roles.subscriber,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    properties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Properties",
      },
    ],
  },
  { timestamps: true }
);
const users = mongoose.model("Users", UserSchema);

export default users;

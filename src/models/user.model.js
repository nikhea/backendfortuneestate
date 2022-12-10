import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import * as mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
    // properties: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Properties",
    //   },
    // ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) this.role = roles.admin;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const users = mongoose.model("Users", UserSchema);

export default users;

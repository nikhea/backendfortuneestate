import * as mongoose from "mongoose";
import { roles } from "../utils/constants.js";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    gender: { type: String, lowercase: true, enum: ["male", "female"] },
    name: { type: String, lowercase: true },
    state: { type: String, lowercase: true },
    lga: { type: String, lowercase: true },
    country: { type: String, lowercase: true },
    address: { type: String, lowercase: true },
    phone: { type: Number },
    profileImage: { type: String },
    bannerImage: { type: String },
    uploadCount: {
      type: Number,
      default: 0,
    },
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);
const profile = mongoose.model("Profile", ProfileSchema);

export default profile;

import * as mongoose from "mongoose";
import { gender } from "../utils/constants.js";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    gender: {
      type: String,
      lowercase: true,
      enum: [gender.male, gender.female],
    },
    state: { type: String, lowercase: true },
    lga: { type: String, lowercase: true },
    country: { type: String, lowercase: true },
    address: { type: String, lowercase: true },
    phone: { type: Number },
    profileImage: {
      publicId: {
        type: String,
      },
      imageUrl: {
        type: String,
        required: false,
      },
    },
    bannerImage: {
      publicId: {
        type: String,
      },
      imageUrl: {
        type: String,
        required: false,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    uploadCount: {
      type: Number,
      default: 0,
    },
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
  },
  { timestamps: true }
);
export default ProfileSchema;
// const ProfileSchema = new Schema(
//   {
//     gender: { type: String, lowercase: true, enum: ["male", "female"] },
//     state: { type: String, lowercase: true },
//     lga: { type: String, lowercase: true },
//     country: { type: String, lowercase: true },
//     address: { type: String, lowercase: true },
//     phone: { type: Number },
//     profileImage: { type: String },
//     bannerImage: { type: String },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     uploadCount: {
//       type: Number,
//       default: 0,
//     },
//     facebook: { type: String },
//     twitter: { type: String },
//     linkedin: { type: String },
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "Users",
//     },
//   },
//   { timestamps: true }
// );
// const profile = mongoose.model("Profile", ProfileSchema);

// export default profile;

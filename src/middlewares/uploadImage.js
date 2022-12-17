import { cloudinaryUploads } from "../cloudinary/cloudinary.js";
import fs from "fs";

export const uploadProfileImage = async (req) => {
  let profileImageUploader, ProfileUrls;
  if (req.files.profileImage === undefined) {
  } else if (req.files.profileImage[0] !== undefined) {
    let ProfileImage = req.files.profileImage[0];
    profileImageUploader = async (path) =>
      await cloudinaryUploads(path, "profileImage");
    ProfileUrls = await profileImageUploader(ProfileImage.path);
    return ProfileUrls;
  }
};

export const uploadBannerImage = async (req) => {
  let BannerImageUploader, BannerUrls;
  if (req.files.bannerImage === undefined) {
  } else if (req.files.bannerImage[0] !== undefined) {
    let BannerImage = req.files.bannerImage[0];
    BannerImageUploader = async (path) =>
      await cloudinaryUploads(path, "bannerImage");
    BannerUrls = await BannerImageUploader(BannerImage.path);
    return BannerUrls;
  }
};
export const uploadPropertiesImage = async (req) => {
  let PropertiesImageUploader, PropertiesUrls;
  PropertiesImageUploader = async (path) =>
    await cloudinaryUploads(path, "propertyUploadImages");
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await PropertiesImageUploader(path);
    urls.push(newPath);
    urls.push(path);
    fs.unlinkSync(path);
  }
  return urls;
  // const newPath = await cloudinaryuploads(path, "propertyUploadImages");
};

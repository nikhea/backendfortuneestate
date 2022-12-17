import { cloudinaryUploads } from "../cloudinary/cloudinary.js";

export const uploadProfileImage = async (req) => {
  let profileImageUploader, ProfileUrls;
  console.log(req.files.profileImage);
  if (req.files.profileImage === undefined) {
  } else if (req.files.profileImage[0] !== undefined) {
    let ProfileImage = req.files.profileImage[0];
    profileImageUploader = async (path) =>
      await cloudinaryUploads(path, "profileImage");
    ProfileUrls = await profileImageUploader(ProfileImage.path);
    return ProfileUrls;
  }
};

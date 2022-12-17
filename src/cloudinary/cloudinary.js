import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// export const cloudinaryuploads = (file, folder) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };

export const cloudinaryuploads = (file, folder) => {
  return cloudinary.uploader
    .upload(file, {
      folder,
    })
    .then((data) => {
      return {
        url: data.url,
        public_id: data.public_id,
      };
    })
    .catch((error) => {
      console.log(error, "cloudinary uploads function");
    });
};

export const cloudinaryRemove = async (public_id) => {
  await cloudinary.uploader.destroy(public_id, function (err, result) {
    console.log(result, err);
  });
};

import imageCompression from "browser-image-compression";

export const resizeImg = async (file) => {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 500,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
};

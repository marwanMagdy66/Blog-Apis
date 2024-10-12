import multer, { diskStorage } from "multer";
export const fileUpload = () => {
  const fileFilter = (req, file, cb) => {
    if (!["image/png", "image/gpeg"].includes(file.mimetype)) {
      cb(new Error("invalid format"), false);
    }
    cb(null, true);
  };
  return multer({ storage: diskStorage({}) }, fileFilter);
};

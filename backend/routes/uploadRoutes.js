import express from "express";
import multer from "multer";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import path from "path";
const router = express.Router();

const __dirname = path.resolve();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/backend/uploads`);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname}---_---${Date.now()}${path.extname(file.originalname)}`
      // `${file.fieldname}--chromakey${Date.now()}--${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|pdf|docx|xlsx|csv|txt|csv/;
  const extname = fileTypes.test(path.extname(file.originalname.toLowerCase()));
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(
      new Error("Images, PDF, Document, PDF, Spreadsheet, and CSV only!")
    );
  }
}

const upload = multer({
  storage,
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb);
  // },
});

router
  .route("/")
  .post(protect, isAdmin, upload.single("clientFile"), (req, res) => {
    const fullImageUrl = req.protocol + "://" + req.get("host") + "/uploads/";
    res.send(`${fullImageUrl}${req.file.filename}`);
  });

export default router;

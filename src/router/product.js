import express from "express";
import multer from "multer";
// import { adminMiddleware, requireSignin } from "../common-middleware/index.js";
import {
  create,
  getAll,
  update,
  deleteById,
  getAllBase,
} from "../controller/product.js";
import shortid from "shortid";
import path from "path";

const router = express.Router();

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "app-back-end/src/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/product/create", create);

router.get("/product/getAll", getAll);
router.get("/product/getallbase", getAllBase);

router.put("/product/:id", update);

router.delete("/product/:id", deleteById);

export default router;

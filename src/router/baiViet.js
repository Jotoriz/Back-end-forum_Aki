import express from "express";
// import { adminMiddleware, requireSignin } from "../common-middleware/index.js";
import {
  checkActor,
  createBaiViets,
  deleteBaiVietById,
  getAllBaiViet,
  getBaiVietById,
  updateBaiViet,
} from "../controller/baiViet.js";

const router = express.Router();
router.post("/baiviet/create", createBaiViets);
router.post("/baiviet/checkActor/:id", checkActor);
router.put("/baiviet/update/:id", updateBaiViet);
router.delete("/baiviet/delete/:id", deleteBaiVietById);
router.get("/baiviet/getAll", getAllBaiViet);
router.get("/baiviet/getBaiVietById/:id", getBaiVietById);

export default router;

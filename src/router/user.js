import express from "express";
import {
  getById,
  getAll,
  update,
  updatePassword,
  uploadAvatar,
} from "../controller/user.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/user/getAll", getAll);

router.get("/user/:id", getById);

router.put("/user/:id", update);

router.put("/user/changepassword/:id", updatePassword);

router.post("/upload", upload.single("avt"), uploadAvatar);

export default router;

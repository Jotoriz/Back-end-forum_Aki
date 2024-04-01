import express from "express";
// import { adminMiddleware, requireSignin } from "../common-middleware/index.js";
import { createBaiViets } from "../controller/baiViet.js";

const router = express.Router();

router.post("/baiviet/create", createBaiViets);

export default router;

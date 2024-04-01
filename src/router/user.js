import express from "express";
import { getById, getAll, update, updatePassword } from "../controller/user.js";

const router = express.Router();

// router.get("/:id", getById);

router.get("/user/getAll", getAll);

router.get("/user/:id", getById);

router.put("/user/:id", update);

router.put("/user/changepassword/:id", updatePassword);

export default router;

import express from "express";
import {
  checkActor,
  create,
  deleteMessageById,
  getAllMessages,
  getMessagesById,
  update,
} from "../controller/messageBaiViet.js";

const router = express.Router();

router.post("/messageBaiViet/create", create);
router.put("/messageBaiViet/update/:id", update);
router.delete("/messageBaiViet/delete/:id", deleteMessageById);
router.post("/messageBaiViet/checkActor/:id", checkActor);
router.get("/messageBaiViet/getAllMessages", getAllMessages);
router.get("/messageBaiViet/getMessagesById/:id", getMessagesById);

export default router;

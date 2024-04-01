import express from "express";
import {
  create,
  getAll,
  update,
  deleteById,
  getByProductID,
  updateActive,
} from "../controller/order.js";

const router = express.Router();

router.post("/order/create", create);

router.get("/order/getAll", getAll);
router.get("/order/:id", getByProductID);

router.put("/order/:id", update);
router.put("/order/updateActive/:id", updateActive);

router.delete("/order/:id", deleteById);

export default router;

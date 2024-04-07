import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
//routes
import authRoutes from "./src/router/auth.js";
import userRoutes from "./src/router/user.js";
import BaiViet from "./src/router/baiViet.js";
import Product from "./src/router/product.js";
import Order from "./src/router/order.js";

// import fileUpload from "express-fileupload";

const app = express();

env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mkkaobp.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected");
  });
// COR

app.use(cors());

app.use(bodyParser.json());
// app.use(fileUpload());
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", BaiViet);
app.use("/api", Product);
app.use("/api", Order);
app.use("/public", express.static("./src/public"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

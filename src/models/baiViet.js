import mongoose from "mongoose";

const baiVietSchema = new mongoose.Schema(
  {
    types: {
      type: String,
      required: true,
    },
    id_Types: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    actor: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    uploadTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const BaiViet = mongoose.model("Baiviet", baiVietSchema);

export default BaiViet;

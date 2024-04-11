import mongoose from "mongoose";

const messageBaiVietSchema = new mongoose.Schema(
  {
    baiViet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Baiviet",
      required: true,
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    like: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    uploadTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const MessageBaiViet = mongoose.model("MessageBaiViet", messageBaiVietSchema);

export default MessageBaiViet;

import BaiViet from "../models/baiViet.js";
import MessageBaiViet from "../models/messageBaiViet.js";

export const create = async (req, res) => {
  try {
    const { baiViet_id, actor, content } = req.body;

    const baiviet = await BaiViet.findById(baiViet_id);
    if (!baiviet) {
      res.status(404).json({ message: "Bài viết không tồn tại" });
      return;
    }
    const like = 0;
    const newMessageBaiViet = new MessageBaiViet({
      baiViet_id,
      actor,
      like,
      content,
    });

    const saved = await newMessageBaiViet.save();

    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export const checkActor = async (req, res) => {
  try {
    const { actor, id } = req.body;

    const message = await MessageBaiViet.findById(id);

    if (!message) {
      res.status(404).json({ message: "Tin nhắn không tồn tại" });
      return;
    }

    const isMatch = message.actor == actor;

    res.status(200).json(isMatch);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    const { id, content, actor } = req.body;

    const message = await MessageBaiViet.findById(id);

    if (!message) {
      res.status(404).json({ message: "Không tìm thấy tin nhắn" });
      return;
    }
    const isMatch = message.actor == actor;
    if (isMatch) {
      res.status(404).json({ message: "Bạn không có quyền sửa tin nhắn này" });
      return;
    }

    const updatedMessage = await message.save();

    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export const deleteMessageById = async (req, res) => {
  try {
    const { id, actor } = req.body;

    const message = await MessageBaiViet.findById(id);
    if (!message) {
      res.status(404).json({ message: "Bài viết không tồn tại" });
      return;
    }

    const isMatch = message.actor == actor;
    if (!isMatch) {
      res.status(404).json({ message: "Bạn không có quyền xóa tin nhắn này" });
      return;
    } else {
      const deletedMessage = await MessageBaiViet.findByIdAndRemove(id);

      if (!deletedMessage) {
        res.status(404).json({ message: "Tin nhắn không tồn tại" });
        return;
      }
    }

    res.status(200).json("Đã xóa thành công tin nhắn");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await MessageBaiViet.find();

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
export const getMessagesById = async (req, res) => {
  try {
    const message = await MessageBaiViet.findById(req.body.id);
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

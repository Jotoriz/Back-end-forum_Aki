import BaiViet from "../models/baiViet.js";

export const createBaiViets = async (req, res) => {
  try {
    const { id_Types, title, actor, content } = req.body;
    const typesMapping = {
      0: "Chưa chọn",
      1: "Tìm Người Chơi Game",
      2: "Hỏi về Game",
      3: "Giải Trí",
      4: "Dịch Vụ",
      5: "Game Mới",
      6: "Quảng Cáo Game",
      7: "Thảo Luận",
      8: "Tin Tức Game",
      9: "Giao Lưu",
      10: "Drama",
    };
    const types = typesMapping[id_Types];

    const newBaiViet = new BaiViet({
      types,
      id_Types,
      title,
      actor,
      content,
    });

    const createdBaiViet = await newBaiViet.save();

    res.status(201).json(createdBaiViet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi trong quá trình tạo bài viết." });
  }
};

export const checkActor = async (req, res) => {
  try {
    const { actor, id } = req.body;

    const baiViet = await BaiViet.findById(id);

    if (!baiViet) {
      res.status(404).json({ baiViet: "Bài viết không tồn tại" });
      return;
    }

    const isMatch = baiViet.actor == actor;

    res.status(200).json(isMatch);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export const updateBaiViet = async (req, res) => {
  try {
    const { id, title, content, actor } = req.body;

    const updatedBaiViet = await BaiViet.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedBaiViet) {
      res.status(404).json({ baiViet: "Bài viết không tồn tại" });
      return;
    }
    const isMatch = updatedBaiViet.actor == actor;
    if (!isMatch) {
      res.status(404).json({ baiViet: "Bạn không có quyền sửa bài viết này" });
    }

    res.status(200).json(updatedBaiViet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi trong quá trình cập nhật bài viết." });
  }
};

export const deleteBaiVietById = async (req, res) => {
  try {
    const { id, actor } = req.body;

    const baiviet = await BaiViet.findById(id);
    if (!baiviet) {
      res.status(404).json({ message: "Bài viết không tồn tại" });
      return;
    }

    const isMatch = baiviet.actor == actor;
    if (!isMatch) {
      res.status(404).json({ message: "Bạn không có quyền xóa bài viết này" });
      return;
    } else {
      const deleteBaiViet = await BaiViet.findByIdAndRemove(id);

      if (!deleteBaiViet) {
        res.status(404).json({ message: "Bài viết không tồn tại" });
        return;
      }
    }

    res.status(200).json("Đã xóa thành công bài viết");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
export const getAllBaiViet = async (req, res) => {
  try {
    const baiviet = await BaiViet.find();

    res.status(200).json(baiviet);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
export const getBaiVietById = async (req, res) => {
  try {
    const baiviet = await BaiViet.findById(req.body.id);

    res.status(200).json(baiviet);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

import BaiViet from "../models/baiViet.js";

export const createBaiViets = async (req, res) => {
  try {
    const { id_Types, title, actor, message } = req.body;

    // Định nghĩa bảng ánh xạ giữa id_Types và types
    const typesMapping = {
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

    // Lấy giá trị của types dựa trên id_Types từ bảng ánh xạ
    const types = typesMapping[id_Types];

    const newBaiViet = new BaiViet({
      types,
      id_Types,
      title,
      actor,
      message,
    });

    const createdBaiViet = await newBaiViet.save();

    res.status(201).json(createdBaiViet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi trong quá trình tạo bài viết." });
  }
};

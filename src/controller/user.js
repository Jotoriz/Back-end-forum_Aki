import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAll = async (req, res) => {
  try {
    const users = await User.find().select("-hash_password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

export const getById = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    const { _id, username, email, avt, notification } = user;
    res.status(200).json({ _id, username, email, avt, notification });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const update = async (req, res) => {
  try {
    const updateData = {
      username: req.body.username,
    };
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const updated = await User.findByIdAndUpdate(decoded._id, updateData, {
      new: true,
    });
    if (updated) {
      return res.status(200).json({
        success: true,
        user: updated,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "missing value",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "server has problem",
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const data = {
      oldPassword: req.body.oldPassword,
      newPassWord: req.body.newPassword,
    };
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    const checkPassword = bcrypt.compareSync(
      data.oldPassword,
      user.hash_password
    );

    if (checkPassword) {
      const newHash_password = await bcrypt.hash(data.newPassWord, 10);
      const updated = await User.findByIdAndUpdate(
        decoded._id,
        {
          hash_password: newHash_password,
        },
        { new: true }
      );
      if (updated) {
        return res.status(200).json({
          success: true,
          user: updated,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Lỗi gì đó",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Sai mật khẩu cũ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "sever has problem",
    });
  }
};

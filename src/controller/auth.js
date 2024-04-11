import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, existUser) => {
    if (existUser)
      return res.status(400).json({
        message: "Email này đã được sử dụng",
      });

    const { email, password, username } = req.body;

    const user = new User({
      email,
      password,
      username,
      avt: "https://a0.anyrgb.com/pngimg/1658/1292/little-boy-icon-little-girl-avatar-ico-icon-design-boy-cartoon-cartoon-character-sitting-cool.png",
    });

    user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        const { _id, username, email, avt, notification } = user;

        return res.status(201).json({
          token,
          user: {
            _id,
            username,
            email,
            avt,
          },
        });
      }
    });
  });
};

export const signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });

    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }

    if (user.authenticate(req.body.password)) {
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET
      );
      const { _id, username, email } = user;
      res.status(200).json({
        token,
        user: {
          _id,
          username,
          email,
        },
      });
    } else {
      // Sai mật khẩu
      return res.status(400).json({
        message: "Sai Mật Khẩu",
      });
    }
  });
};

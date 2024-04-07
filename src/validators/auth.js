import { check, validationResult } from "express-validator";

export const validateSignupRequest = [
  check("username").notEmpty().withMessage("user Name is required"),
  check("email").isEmail().withMessage("valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 character long"),
];

export const validateSigninRequest = [
  check("email").isEmail().withMessage("valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 character long"),
];

export const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

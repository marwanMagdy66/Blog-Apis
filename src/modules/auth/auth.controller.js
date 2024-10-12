import jwt from "jsonwebtoken";
import { User } from "../../../DB/models/user.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../utils/sendEmail.js";
import { Token } from "../../../DB/models/token.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword, role } = req.body;
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return next(new Error("Email already exists"));
  }
  if (password !== confirmPassword)
    return next(new Error("Passwords do not match"));
  const encryptPass = bcryptjs.hashSync(password, 8);
  //generate token
  const token = jwt.sign({ email }, process.env.TOKEN_KEY);
  //   create user
  const user = await User.create({
    name,
    email,
    password: encryptPass,
    role,
  });
  //create confirmaion link
  const confirmationLink = `http://localhost:3000/auth/activate_account/${token}`;
  //send mail
  const mail = await sendEmail({
    to: email,
    subject: "Confirm your email",
    html: confirmationLink,
  });
  if (!mail)
    return next(new Error("message not sent to email for verify Email"));

  return res.json({ success: true, msg: "check your email", user });
});

//activate account

export const activate = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { email } = jwt.verify(token, process.env.TOKEN_KEY);
  const user = await User.findOne({ email });
  if (!user) return next(new Error("user not found"));
  user.isActive = true;
  await user.save();
  return res.json({ success: true, msg: "account activated", user });
});

// login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new Error("user not found"));
  if (!user.isActive) return next(new Error("account not activated"));
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) return next(new Error("password is incorrect"));
  const token = jwt.sign({email,id:user._id}, process.env.TOKEN_KEY);
  await Token.create({ token, userId: user._id, isValid: true });
  return res.json({ success: true, msg: "login successful", token });
});

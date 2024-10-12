import { Token } from "../../DB/models/token.js";
import { User } from "../../DB/models/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const isAuth = asyncHandler(async (req, res, next) => {
  const token  = req.headers["token"];
  if (!token) {
    return next(new Error("you must add a token !", { cause: 404 }));
  }
  let payload;
  try {
    payload = await jwt.verify(token, process.env.TOKEN_KEY);
    console.log(payload)
  } catch {
    return next(new Error("invalid token !", { cause: 401 }));
  }
  //check token in DB
  const tokenDB = await Token.findOne({ token, isValid: true });
  if (!tokenDB) {
    return next(new Error("token not found !", { cause: 404 }));
  }
  const user = await User.findById(payload.id);
  if (!user) {
    return next(new Error("user not found !", { cause: 404 }));
  }
  req.user = user;
  next();
});

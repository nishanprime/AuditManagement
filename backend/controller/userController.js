import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.admin,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

export const getAuditors = asyncHandler(asyn (req,res) => {
  const users = await UserModel.find({})
  
});


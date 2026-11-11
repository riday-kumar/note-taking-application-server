import { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { AppError } from "../../utility/AppError";
import { jwtUtils } from "../../utility/jwt";
import User from "../user/user.model";
import { LoginPayload, RegisterUser } from "./auth.interface";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

const registerUser = async (payload: RegisterUser) => {
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round),
  );

  const newUser = new User({
    name: payload.name,
    email: payload.email,
    password: hashPassword,
    interests: payload.interests,
  });
  await newUser.save();

  return null;
};

const userLogin = async (payload: LoginPayload) => {
  //   console.log("login payload", payload);
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  //   console.log("user is exists", user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found!");
  }

  const comparePass = await bcrypt.compare(payload.password, user?.password);
  //   console.log("compared password", comparePass);

  if (!comparePass) {
    throw new AppError(httpStatus.FORBIDDEN, "Password Not Matched!");
  }

  const jwtPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  //   console.log("jwt payload", jwtPayload);

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_token_expire as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_token_expire as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = {
  registerUser,
  userLogin,
};

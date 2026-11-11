import config from "../../config";
import User from "../user/user.model";
import { RegisterUser } from "./auth.interface";
import bcrypt from "bcrypt";

const registerUser = async (payload: RegisterUser) => {
  const hashPassword = bcrypt.hashSync(
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

export const authService = {
  registerUser,
};

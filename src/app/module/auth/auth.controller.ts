import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utility/sendResponse";
import httpStatus from "http-status";
import config from "../../config";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  authService.registerUser(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Created Successfully",
    data: null,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const { accessToken, refreshToken } = await authService.userLogin(payload);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.node_env === "development" ? false : true,
    sameSite:
      config.node_env === "development" ? ("lax" as const) : ("none" as const),
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
    path: "/",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "development" ? false : true,
    sameSite:
      config.node_env === "development" ? ("lax" as const) : ("none" as const),
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login Successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

export const authController = {
  registerUser,
  loginUser,
};

import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utility/sendResponse";
import httpStatus from "http-status";

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

export const authController = {
  registerUser,
};

import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./app/middlewares/notFound";
import httpStatus from "http-status";
import { sendResponse } from "./app/utility/sendResponse";
import config from "./app/config";
import { authRouter } from "./app/module/auth/auth.route";

const app: Express = express();

app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
  }),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

// basic route
app.get("/", (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: config.welcome_msg,
  });
});

// Register Not Found handler middleware
app.use(notFound);

export default app;

import http from "http-status";
import { AsyncFun } from "../../../utils/AsyncFun";
import sendResponse from "../../../utils/sendResponse";
import {
  createLogin,
  createRegister,
  refreshTokenIntoDb,
} from "./user.service";
export const userRegister = AsyncFun(async (req, res, next) => {
  const result = await createRegister(req.body);
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "User created successfully",
    data: result,
  });
});
export const userLogin = AsyncFun(async (req, res, next) => {
  const result = await createLogin(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "User Login successfully",
    data: {
      accessToken: result.accessToken,
    },
  });
});
export const refreshToken = AsyncFun(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await refreshTokenIntoDb(refreshToken);
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "Refresh token is retrieved succesfully!",
    data: result,
  });
});

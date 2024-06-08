import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../error/AppError";
import { TLogin, TRegister } from "./user.interface";
import { User } from "./user.model";
import { createToken, verifyToken } from "./user.utils";
export const createRegister = async (payload: TRegister) => {
  if (await User.isUserExistsByEmail(payload.email)) {
    throw new AppError(httpStatus.BAD_REQUEST, "This email already used");
  }

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!payload.email.match(regex)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please provide valid email");
  }

  const result = await User.create(payload);
  return result;
};
export const createLogin = async (payload: TLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.UNAUTHORIZED, "Password do not matched");
  const jwtPayload = {
    userId: user?._id,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return { accessToken, refreshToken };
};
export const refreshTokenIntoDb = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  const { email } = decoded;

  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  const jwtPayload = {
    userId: user._id,
    email: user?.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return {
    accessToken,
  };
};

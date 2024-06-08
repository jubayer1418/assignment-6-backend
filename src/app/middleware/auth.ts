import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { AsyncFun } from "../../utils/AsyncFun";
import config from "../config";
import AppError from "../error/AppError";
import { TUserRole } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../modules/user/user.utils";
const auth = (...requiredRoles: TUserRole[]) => {
  return AsyncFun(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    let decoded;
    try {
      decoded = verifyToken(token, config.jwt_access_secret as string);
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "JWT expire!");
    }

    const { role, email } = decoded as JwtPayload;

    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized  hi!"
      );
    }
    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};
export default auth;

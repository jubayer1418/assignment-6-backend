import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "./user.constant";

export const createToken = (
  jwtPayload: { userId: string; role: TUserRole; email: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

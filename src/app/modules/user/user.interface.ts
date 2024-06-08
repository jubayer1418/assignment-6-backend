import { Model } from "mongoose";

export type TLogin = {
  email: string;
  password: string;
};
export type TRegister = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "manager";
};
export interface userModel extends Model<TRegister> {
  //checking user exist
  isUserExistsByEmail(email: string): Promise<TRegister>;
  //checking user password matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

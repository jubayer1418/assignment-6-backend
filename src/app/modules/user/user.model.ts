import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TRegister, userModel } from "./user.interface";

export const userSchema = new Schema<TRegister, userModel>(
  {
    name: {
      type: String,
      required: [true, "UserName is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "manager"],
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt));
  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const User = model<TRegister, userModel>("User", userSchema);

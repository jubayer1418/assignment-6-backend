"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    role: zod_1.z.enum(["user", "manager"]).default("user"),
});
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: "Email is required." }),
    password: zod_1.z.string({ required_error: "Password is required" }),
    role: zod_1.z.string().optional(),
});
exports.UserZodValidations = {
    createUserValidationSchema,
    loginValidationSchema,
};

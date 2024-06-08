"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/create-user", (0, validateRequest_1.default)(user_validation_1.UserZodValidations.createUserValidationSchema), user_controller_1.userRegister);
router.post("/login-user", (0, validateRequest_1.default)(user_validation_1.UserZodValidations.loginValidationSchema), user_controller_1.userLogin);
router.post("/refresh-token", user_controller_1.refreshToken);
exports.UserRouter = router;

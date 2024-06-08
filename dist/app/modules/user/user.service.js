"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenIntoDb = exports.createLogin = exports.createRegister = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createRegister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExistsByEmail(payload.email)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This email already used");
    }
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!payload.email.match(regex)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Please provide valid email");
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
exports.createRegister = createRegister;
const createLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Password do not matched");
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return { accessToken, refreshToken };
});
exports.createLogin = createLogin;
const refreshTokenIntoDb = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, user_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    const jwtPayload = {
        userId: user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user.role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
exports.refreshTokenIntoDb = refreshTokenIntoDb;

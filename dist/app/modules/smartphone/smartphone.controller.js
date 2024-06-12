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
exports.deleteManyProduct = exports.deleteSmartphone = exports.patchSmartphone = exports.getSingleProduct = exports.getSmartphone = exports.createSmartphone = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AsyncFun_1 = require("../../../utils/AsyncFun");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const smartphone_service_1 = require("./smartphone.service");
exports.createSmartphone = (0, AsyncFun_1.AsyncFun)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, smartphone_service_1.createSmartphoneToDb)(req.body, req.user.email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Smartphone create successfully!",
        data: result,
    });
}));
exports.getSmartphone = (0, AsyncFun_1.AsyncFun)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, email } = req.user;
    const result = yield (0, smartphone_service_1.getSmartphoneToDb)(req.query, email, role);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Smartphone retrieve successfully!",
        data: result,
    });
}));
exports.getSingleProduct = (0, AsyncFun_1.AsyncFun)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, smartphone_service_1.getSingleProductIntoDB)(id);
    //   send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Single product retrieved successfully",
        data: result,
    });
}));
exports.patchSmartphone = (0, AsyncFun_1.AsyncFun)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, smartphone_service_1.patchSmartphoneToDb)(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Smartphone update successfully!",
        data: result,
    });
}));
exports.deleteSmartphone = (0, AsyncFun_1.AsyncFun)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, smartphone_service_1.deleteSmartphoneToDb)(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Smartphone deleted successfully!",
        data: [],
    });
}));
exports.deleteManyProduct = (0, AsyncFun_1.AsyncFun)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body;
    const result = yield (0, smartphone_service_1.deleteManyProductsIntoDB)(ids);
    //   send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All Products deleted successfully",
        data: result,
    });
}));

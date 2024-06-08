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
exports.getSalesToDb = exports.getSingleSaleIntoDB = exports.createSalesToDb = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const smartphone_model_1 = require("../smartphone/smartphone.model");
const user_model_1 = require("../user/user.model");
const sales_model_1 = require("./sales.model");
const createSalesToDb = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    payload.userEmail = email;
    const userEmail = email;
    const userExist = yield user_model_1.User.findOne({ email: userEmail });
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield smartphone_model_1.Smartphone.findOneAndUpdate({ _id: payload.productId, quantity: { $gte: payload.quantity } }, {
        $inc: { quantity: -payload.quantity },
    }, { new: true });
    if (result) {
        if (result.quantity === 0) {
            yield smartphone_model_1.Smartphone.deleteOne({ _id: payload.productId });
        }
        const salesResult = yield sales_model_1.Sales.create(payload);
        return salesResult;
    }
    else {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Insufficient quantity or smartphone not found");
    }
});
exports.createSalesToDb = createSalesToDb;
const getSingleSaleIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = sales_model_1.Sales.findById(id).populate("productId");
    return result;
});
exports.getSingleSaleIntoDB = getSingleSaleIntoDB;
const getSalesToDb = (query, email, role) => __awaiter(void 0, void 0, void 0, function* () {
    const { filterBy } = query;
    console.log(filterBy);
    let dateFilter = {};
    if (filterBy) {
        const currentDate = new Date();
        switch (filterBy) {
            case "daily":
                dateFilter = {
                    createdAt: {
                        $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
                        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
                    },
                };
                break;
            case "weekly":
                dateFilter = {
                    createdAt: {
                        $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()),
                        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()) + 1),
                    },
                };
                break;
            case "monthly":
                dateFilter = {
                    createdAt: {
                        $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
                    },
                };
                break;
            case "yearly":
                dateFilter = {
                    createdAt: {
                        $gte: new Date(currentDate.getFullYear(), 0, 1),
                        $lt: new Date(currentDate.getFullYear() + 1, 0, 1),
                    },
                };
                break;
            default:
                dateFilter = {
                    createdAt: {
                        $gte: new Date(currentDate.getFullYear(), 0, 1),
                        $lt: new Date(currentDate.getFullYear() + 1, 0, 1),
                    },
                };
                break;
        }
    }
    let result;
    if (role === "manager" || role === "superAdmin") {
        result = yield sales_model_1.Sales.find(dateFilter).populate("productId");
    }
    else if (role === "user") {
        result = yield sales_model_1.Sales.find(Object.assign({ email: email }, dateFilter)).populate("productId");
    }
    else {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid user role");
    }
    return result;
});
exports.getSalesToDb = getSalesToDb;

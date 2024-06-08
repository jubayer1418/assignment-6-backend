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
exports.deleteManyProductsIntoDB = exports.deleteSmartphoneToDb = exports.patchSmartphoneToDb = exports.getSmartphoneToDb = exports.getSingleProductIntoDB = exports.createSmartphoneToDb = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/src/app/builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../user/user.model");
const smartphone_model_1 = require("./smartphone.model");
const createSmartphoneToDb = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = email;
    console.log(userEmail);
    const userExist = yield user_model_1.User.findOne({ email: userEmail });
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield smartphone_model_1.Smartphone.create(payload);
    return result;
});
exports.createSmartphoneToDb = createSmartphoneToDb;
const getSingleProductIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield smartphone_model_1.Smartphone.findById(id);
    return result;
});
exports.getSingleProductIntoDB = getSingleProductIntoDB;
const getSmartphoneToDb = (query, email, role) => __awaiter(void 0, void 0, void 0, function* () {
    const minPrice = query.minPrice;
    const maxPrice = query.maxPrice;
    const ProductSearchableFields = [
        "name",
        "brand",
        "model",
        "operatingSystem",
        "storageCapacity",
        "screenSize",
        "camera",
        "battery",
    ];
    const productQuery = new QueryBuilder_1.default(smartphone_model_1.Smartphone.find(), query)
        .search(ProductSearchableFields)
        .filter()
        .filterByPriceRange(minPrice, maxPrice)
        .paginate();
    let result;
    if (role === "manager") {
        console.log("result");
        result = yield productQuery.modelQuery;
    }
    else if (role === "user") {
        // console.log(email, role);
        result = yield productQuery.modelQuery;
    }
    else if (role === "superAdmin") {
        // console.log(email, role);
        result = yield productQuery.modelQuery;
    }
    else {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid user role");
    }
    console.log(result);
    return result;
});
exports.getSmartphoneToDb = getSmartphoneToDb;
const patchSmartphoneToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield smartphone_model_1.Smartphone.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.patchSmartphoneToDb = patchSmartphoneToDb;
const deleteSmartphoneToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield smartphone_model_1.Smartphone.findByIdAndDelete(id);
});
exports.deleteSmartphoneToDb = deleteSmartphoneToDb;
const deleteManyProductsIntoDB = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: { $in: ids } };
    const result = yield smartphone_model_1.Smartphone.deleteMany(filter);
    return result;
});
exports.deleteManyProductsIntoDB = deleteManyProductsIntoDB;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const sales_controller_1 = require("./sales.controller");
const sales_validation_1 = require("./sales.validation");
const router = (0, express_1.Router)();
router.post("/create-sales", (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.manager, user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(sales_validation_1.SalesZodValidations.createSalesValidationSchema), sales_controller_1.createSales);
router.get("/get-all-sales", (0, auth_1.default)(user_constant_1.USER_ROLE.manager, user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.superAdmin), sales_controller_1.getSales);
router.get("/get-sale/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.manager, user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.superAdmin), sales_controller_1.getSingleSale);
exports.salesRouter = router;

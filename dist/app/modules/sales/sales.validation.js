"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesZodValidations = void 0;
const zod_1 = require("zod");
const createSalesValidationSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number(),
    buyerName: zod_1.z.string(),
    saleDate: zod_1.z.string(),
});
exports.SalesZodValidations = {
    createSalesValidationSchema,
};

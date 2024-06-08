"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = exports.createEyeglassesSchema = void 0;
const zod_1 = require("zod");
exports.createEyeglassesSchema = zod_1.z.object({
    name: zod_1.z.string(),
    price: zod_1.z.number().min(0),
    quantity: zod_1.z.number().min(0),
    releaseDate: zod_1.z.string(),
    brand: zod_1.z.enum([
        "Apple",
        "Samsung",
        "Huawei",
        "Xiaomi",
        "Oppo",
        "Vivo",
        "Lenovo",
        "LG",
        "Google",
        "OnePlus",
    ]),
    model: zod_1.z.string(),
    operatingSystem: zod_1.z.enum(["Android", "IOS"]),
    storageCapacity: zod_1.z.enum([
        "16GB",
        "32GB",
        "64GB",
        "128GB",
        "256GB",
        "512GB",
        "1TB",
    ]),
    screenSize: zod_1.z.enum([
        "4 inches",
        "4.7 inches",
        "5 inches",
        "5.5 inches",
        "6 inches",
        "6.4 inches",
        "6.7 inches",
        "6.9 inches",
    ]),
    camera: zod_1.z.enum([
        "8MP",
        "12MP",
        "16MP",
        "20MP",
        "24MP",
        "32MP",
        "48MP",
        "64MP",
        "108MP",
    ]),
    battery: zod_1.z.enum([
        "1000mAh",
        "2000mAh",
        "3000mAh",
        "4000mAh",
        "5000mAh",
        "6000mAh",
        "7000mAh",
    ]),
    productImage: zod_1.z.string(),
});
exports.ProductValidation = {
    createEyeglassesSchema: exports.createEyeglassesSchema,
};

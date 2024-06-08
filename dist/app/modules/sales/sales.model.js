"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = exports.salesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.salesSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Smartphone",
        required: [true, "Smartphone is Required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is Required"],
    },
    buyerName: {
        type: String,
        required: [true, "NameOfBuyer is Required"],
    },
    saleDate: {
        type: String,
        required: [true, "saleDate is Required"],
    },
    userEmail: {
        type: String,
        required: [true, "userEmail is Required"],
    },
}, { timestamps: true });
exports.Sales = (0, mongoose_1.model)("Sales", exports.salesSchema);

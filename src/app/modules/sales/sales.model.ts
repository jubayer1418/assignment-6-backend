import { Schema, model } from "mongoose";

import { TSales } from "./sales.interface";

export const salesSchema = new Schema<TSales>(
  {
    productId: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

export const Sales = model<TSales>("Sales", salesSchema);

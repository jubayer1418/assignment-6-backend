import { Types } from "mongoose";

export type TSales = {
  productId: Types.ObjectId;
  quantity: number;
  buyerName: string;
  saleDate: string;
  userEmail: string;
};

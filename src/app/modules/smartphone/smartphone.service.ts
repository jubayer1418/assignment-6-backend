import httpStatus from "http-status";
import QueryBuilder from "../../builder/src/app/builder/QueryBuilder";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TSmartphone } from "./smartphone.interface";
import { Smartphone } from "./smartphone.model";

export const createSmartphoneToDb = async (
  payload: TSmartphone,
  email: string
) => {
  const userEmail = email;

  const userExist = await User.findOne({ email: userEmail });
  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await Smartphone.create(payload);
  return result;
};
export const getSingleProductIntoDB = async (id: string) => {
  const result = await Smartphone.findById(id);
  return result;
};
export const getSmartphoneToDb = async (
  query: Record<string, unknown>,
  email: string,
  role: string
) => {
  const minPrice = query.minPrice as number;
  const maxPrice = query.maxPrice as number;
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
  const productQuery = new QueryBuilder(Smartphone.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .filterByPriceRange(minPrice, maxPrice)
    .paginate();
  let result;
  if (role === "manager") {
  
    result = await productQuery.modelQuery;
  } else if (role === "user") {
  
    result = await productQuery.modelQuery;
  } else if (role === "superAdmin") {
 
    result = await productQuery.modelQuery;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user role");
  }

  return result;
};
export const patchSmartphoneToDb = async (
  id: string,
  payload: Partial<TSmartphone>
) => {
  const result = await Smartphone.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
export const deleteSmartphoneToDb = async (id: string) => {
  await Smartphone.findByIdAndDelete(id);
};
export const deleteManyProductsIntoDB = async (ids: string[]) => {
  const filter = { _id: { $in: ids } };
  const result = await Smartphone.deleteMany(filter);
  return result;
};

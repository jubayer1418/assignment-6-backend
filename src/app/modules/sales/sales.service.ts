import { default as http, default as httpStatus } from "http-status";
import AppError from "../../error/AppError";
import { Smartphone } from "../smartphone/smartphone.model";
import { User } from "../user/user.model";
import { TSales } from "./sales.interface";
import { Sales } from "./sales.model";
export const createSalesToDb = async (payload: TSales, email: string) => {
  payload.userEmail = email;
  const userEmail = email;
  const userExist = await User.findOne({ email: userEmail });
  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await Smartphone.findOneAndUpdate(
    { _id: payload.productId, quantity: { $gte: payload.quantity } },
    {
      $inc: { quantity: -payload.quantity },
    },
    { new: true }
  );

  if (result) {
    if (result.quantity === 0) {
      await Smartphone.deleteOne({ _id: payload.productId });
    }
    const salesResult = await Sales.create(payload);
    return salesResult;
  } else {
    throw new AppError(
      http.BAD_REQUEST,
      "Insufficient quantity or smartphone not found"
    );
  }
};
export const getSingleSaleIntoDB = async (id: string) => {
  const result = Sales.findById(id).populate("productId");
  return result;
};
export const getSalesToDb = async (
  query: Record<string, unknown>,
  email: string,
  role: string
) => {
  const { filterBy } = query;
console.log(role,email)
  let dateFilter: Record<string, unknown> = {};

  if (filterBy) {
    const currentDate = new Date();

    switch (filterBy) {
      case "daily":
        dateFilter = {
          createdAt: {
            $gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            ),
            $lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() + 1
            ),
          },
        };
        break;
      case "weekly":
        dateFilter = {
          createdAt: {
            $gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() - currentDate.getDay()
            ),
            $lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() + (6 - currentDate.getDay()) + 1
            ),
          },
        };
        break;
      case "monthly":
        dateFilter = {
          createdAt: {
            $gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              1
            ),
            $lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              1
            ),
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
    result = await Sales.find(dateFilter).populate("productId");
  } else if (role === "user") {
    result = await Sales.find({ userEmail: email, ...dateFilter }).populate(
      "productId"
    );
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user role");
  }
  return result;
};

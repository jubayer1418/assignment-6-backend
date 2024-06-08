import { default as http, default as httpStatus } from "http-status";
import { AsyncFun } from "../../../utils/AsyncFun";
import sendResponse from "../../../utils/sendResponse";
import {
  createSalesToDb,
  getSalesToDb,
  getSingleSaleIntoDB,
} from "./sales.service";
export const createSales = AsyncFun(async (req, res, next) => {
  const result = await createSalesToDb(req.body, req.user.email);
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "Sales create successfully!",
    data: result,
  });
});
export const getSales = AsyncFun(async (req, res, next) => {
  console.log(req.query);
  const { email, role } = req.user;
  const result = await getSalesToDb(req.query, email, role);
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "Sales retrieve successfully!",
    data: result,
  });
});

export const getSingleSale = AsyncFun(async (req, res, next) => {
  const { id } = req.params;
  const result = await getSingleSaleIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Sale is retrieved successfully",
    data: result,
  });
});

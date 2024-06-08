import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { createSales, getSales, getSingleSale } from "./sales.controller";
import { SalesZodValidations } from "./sales.validation";
const router = Router();
router.post(
  "/create-sales",
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.user),
  validateRequest(SalesZodValidations.createSalesValidationSchema),
  createSales
);
router.get(
  "/get-all-sales",
  auth(USER_ROLE.manager, USER_ROLE.user, USER_ROLE.superAdmin),
  getSales
);
router.get(
  "/get-sale/:id",
  auth(USER_ROLE.manager, USER_ROLE.user, USER_ROLE.superAdmin),
  getSingleSale
);

export const salesRouter = router;

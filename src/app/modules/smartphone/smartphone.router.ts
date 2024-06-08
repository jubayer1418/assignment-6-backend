import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";

import auth from "../../middleware/auth";
import {
  createSmartphone,
  deleteManyProduct,
  deleteSmartphone,
  getSingleProduct,
  getSmartphone,
  patchSmartphone,
} from "./smartphone.controller";
import { ProductValidation } from "./smartphone.validation";
const router = Router();
router.post(
  "/add-product",
  auth(USER_ROLE.manager, USER_ROLE.superAdmin),
  validateRequest(ProductValidation.createEyeglassesSchema),
  createSmartphone
);
router.get(
  "/get-all-products",
  auth(USER_ROLE.manager, USER_ROLE.user, USER_ROLE.superAdmin),
  getSmartphone
);
router.get(
  "/get-single-product/:id",
  auth(USER_ROLE.manager, USER_ROLE.user, USER_ROLE.superAdmin),
  getSingleProduct
);
router.delete(
  "/delete-product/:id",
  auth(USER_ROLE.manager, USER_ROLE.superAdmin),
  deleteSmartphone
);
router.delete(
  "/delete-products",
  auth(USER_ROLE.manager, USER_ROLE.superAdmin),
  deleteManyProduct
);
router.put(
  "/update-product/:id",
  auth(USER_ROLE.manager, USER_ROLE.superAdmin),
  patchSmartphone
);
export const smartphoneRouter = router;

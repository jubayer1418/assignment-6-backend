import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { refreshToken, userLogin, userRegister } from "./user.controller";
import { UserZodValidations } from "./user.validation";
const router = Router();
router.post(
  "/create-user",
  validateRequest(UserZodValidations.createUserValidationSchema),

  userRegister
);
router.post(
  "/login-user",
  validateRequest(UserZodValidations.loginValidationSchema),
  userLogin
);
router.post("/refresh-token", refreshToken);
export const UserRouter = router;

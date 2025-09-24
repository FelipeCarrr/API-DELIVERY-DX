import { Router } from "express";
import { authStaffController } from "../controllers/auth-staff.controller.js";
const authStaffRouter = Router();

authStaffRouter.post("/register", authStaffController.register);
authStaffRouter.post("/login", authStaffController.login);
authStaffRouter.post("/loginMobile", authStaffController.loginMobile);
authStaffRouter.post("/validate", authStaffController.verifyToken);

export default authStaffRouter;

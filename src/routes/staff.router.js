import { Router } from "express";
import { StaffController } from "../controllers/staff.controller.js";
const staffRouter = Router();

staffRouter.get("/allStaff", StaffController.getAllStaff);
staffRouter.get("/getStaffPackager", StaffController.getStaffPackager);

export default staffRouter;

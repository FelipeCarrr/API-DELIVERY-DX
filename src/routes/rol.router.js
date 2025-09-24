import { Router } from "express";
import { RolController } from "../controllers/rol.controller.js";

const rolRouter = Router();

rolRouter.get("/getRols", RolController.getRols);

export default rolRouter;

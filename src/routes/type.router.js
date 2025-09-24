import { Router } from "express";
import { typeController } from "../controllers/type.controller.js";
const typeRouter = Router();

typeRouter.post("/createType", typeController.createType);
typeRouter.get("/getAll", typeController.getAllTypes);
typeRouter.delete("/deleteType/:name", typeController.deleteType);

export default typeRouter;

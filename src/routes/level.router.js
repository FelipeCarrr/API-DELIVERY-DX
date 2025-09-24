import { Router } from "express"
import { levelController } from "../controllers/level.controller.js";
const levelRouter = Router();

levelRouter.post("/createLevel", levelController.createLevel);
levelRouter.get("/getAll", levelController.getAllLevels);
levelRouter.get("/getOneLevel/:id", levelController.getOneLevel);
levelRouter.delete("/deleteLevel/:id", levelController.deleteLevel);

export default levelRouter;
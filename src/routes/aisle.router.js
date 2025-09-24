import { Router } from "express";
import { aisleController } from "../controllers/aisle.controller.js";
const aisleRouter = Router();

aisleRouter.post("/createAisle", aisleController.createAisle);
aisleRouter.get("/getAll", aisleController.getAllAisles);
aisleRouter.delete("/deleteAisle/:number", aisleController.deleteAisle);
aisleRouter.get("/getAllDataAisle", aisleController.getAllDataAisle);

export default aisleRouter;

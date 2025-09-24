import { Router } from "express";
import { shelveController } from "../controllers/shelve.controller.js";
const shelveRouter = Router();

shelveRouter.post("/createShelve", shelveController.createShelve);
shelveRouter.delete("/deleteShelve", shelveController.deleteShelve);
shelveRouter.post("/getOneShelve", shelveController.getOneShelve);
shelveRouter.get(
  "/getAllShelveToOneAisle/:number",
  shelveController.getAllShelveToOneAisle
);
shelveRouter.put("/updateShelve/:id", shelveController.updateShelve);

export default shelveRouter;

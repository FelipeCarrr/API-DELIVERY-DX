import { Router } from "express";
import { basketController } from "../controllers/basket.controller.js";

const basketRouter = Router();

basketRouter.post("/createBasket", basketController.createBasket);
basketRouter.put("/updateBasket/:id", basketController.updateBasket);
basketRouter.get("/getAll", basketController.getAllBaskets);
basketRouter.get("/getOneBasket/:id", basketController.getOneBasket);
basketRouter.delete("/deleteBasket/:id", basketController.deleteBasket);

export default basketRouter;
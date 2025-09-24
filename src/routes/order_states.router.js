import { Router } from "express";
import { order_StatesController } from "../controllers/order_states.controller.js";



const orderStatesRouter = Router();

orderStatesRouter.post("/createOrder_State", order_StatesController.createOrder_State);
orderStatesRouter.put("/updateOrder_State/:id", order_StatesController.updateOrder_State);
orderStatesRouter.get("/getAll", order_StatesController.getAllOrder_States);
orderStatesRouter.get("/getOneOrder_State/:id", order_StatesController.getOneOrder_State);
orderStatesRouter.delete("/deleteOrder_State/:id", order_StatesController.deleteOrder_State);

export default orderStatesRouter;
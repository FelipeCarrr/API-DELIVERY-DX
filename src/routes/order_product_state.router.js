import { Router } from "express";
import { order_Product_StateController } from "../controllers/order_product_state.controller.js";



const orderProductStateRouter = Router();

orderProductStateRouter.post("/createOrder_Product_State", order_Product_StateController.createOrder_Product_State);
orderProductStateRouter.put("/updateOrder_Product_State/:id", order_Product_StateController.updateOrder_Product_State);
orderProductStateRouter.get("/getAll", order_Product_StateController.getAllOrder_Product_State);
orderProductStateRouter.get("/getOneOrder_Product_State/:id", order_Product_StateController.getOneOrder_Product_State);
orderProductStateRouter.delete("/deleteOrder_Product_State/:id", order_Product_StateController.deleteOrder_Product_State);

export default orderProductStateRouter;
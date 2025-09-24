import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/createOrder", orderController.createOrder);
orderRouter.put("/updateOrder/:id", orderController.updateOrder);
orderRouter.get("/getAllNew", orderController.getAllOrdersNew);
orderRouter.get("/getAllPrepare", orderController.getAllOrdersPrepare);
orderRouter.get("/getAllDelivery", orderController.getAllOrdersDelivery);
orderRouter.get("/getOneOrder/:id", orderController.getOneOrder);
orderRouter.delete("/deleteOrder/:id", orderController.deleteOrder);
orderRouter.post("/createOrderAllData", orderController.createOrderAllData);
orderRouter.post("/markOrderAsCollected/:id", orderController.markOrderAsCollected);
orderRouter.get("/ByDeliveryAndLocation", orderController.getOrdersByDeliveryAndLocation);

export default orderRouter;

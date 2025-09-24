import { Router } from "express";
import { OrderStaffController } from "../controllers/order_staff.controller.js";

const orderStaffRouter = Router();

orderStaffRouter.post(
  "/createOrderStaff",
  OrderStaffController.createOrderStaff
);
orderStaffRouter.put(
  "/updateOrderStaff/:id",
  OrderStaffController.updateOrderStaff
);
orderStaffRouter.get("/getAll", OrderStaffController.getAllOrderStaff);

orderStaffRouter.get(
  "/getOneOrderStaff/:id",
  OrderStaffController.getOneOrderStaff
);
orderStaffRouter.delete(
  "/deleteOrderStaff/:id",
  OrderStaffController.deleteOrderStaff
);
orderStaffRouter.get(
  "/getOrdersByCollector/:id",
  OrderStaffController.getOrdersByCollectorId
);
orderStaffRouter.patch(
  "/markReadyForDelivery/:id",
  OrderStaffController.markReadyForDelivery
);
orderStaffRouter.post("/assignDelivery", OrderStaffController.assignDelivery);
orderStaffRouter.post(
  "/reasignarRecolector",
  OrderStaffController.reasignarRecolector
);

orderStaffRouter.put("/updateStatus/:id", OrderStaffController.updateStatus);
orderStaffRouter.get("/getStatus/:id", OrderStaffController.getStatus);

orderStaffRouter.get(
  "/getDeliveryInformation/:id",
  OrderStaffController.getDeliveryInformation
);

orderStaffRouter.put(
  "/releaseCollector/:id",
  OrderStaffController.releaseCollector
);

orderStaffRouter.get(
  "/getOrdersByCourier/:id",
  OrderStaffController.getOrdersByCourierId
);

orderStaffRouter.put(
  "/releaseDelivery/:id",
  OrderStaffController.releaseDelivery
);

export default orderStaffRouter;

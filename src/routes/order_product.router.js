import { Router } from "express";
import { order_ProductController } from "../controllers/order_product.controller.js";

const orderProductRouter = Router();

orderProductRouter.post(
  "/createOrder_Product",
  order_ProductController.createOrder_Product
);
orderProductRouter.put(
  "/updateOrder_Product/:id",
  order_ProductController.updateOrder_Product
);
orderProductRouter.get("/getAll", order_ProductController.getAllOrder_Products);
orderProductRouter.get(
  "/getOneOrder_Product/:id",
  order_ProductController.getOneOrder_Product
);
orderProductRouter.delete(
  "/deleteOrder_Product/:id",
  order_ProductController.deleteOrder_Product
);
orderProductRouter.get(
  "/getProductsByOrderId/:id",
  order_ProductController.getProductsByOrderId
);
orderProductRouter.get(
  "/getOneProductByOrderId/:id",
  order_ProductController.getOneOrder_Product
);

export default orderProductRouter;

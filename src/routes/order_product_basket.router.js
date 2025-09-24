import { Router } from "express";
import { OrderProductBasketController } from "../controllers/order_product_basket.controller.js";

const orderProductBasketRouter = Router();

orderProductBasketRouter.patch(
  "/collectProductFromBasket/:id",
  OrderProductBasketController.collectProduct
);
orderProductBasketRouter.post(
  "/assignBasketToOrderProduct",
  OrderProductBasketController.assignBasket
);

export default orderProductBasketRouter;

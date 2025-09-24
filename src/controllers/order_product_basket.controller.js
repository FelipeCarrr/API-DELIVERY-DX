import { OrderProductBasketService } from "../services/order_product_basket.service.js";

export class OrderProductBasketController {
  static async collectProduct(req, res) {
    const { id } = req.params;

    try {
      const result = await OrderProductBasketService.collectProductFromBasket(
        id
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  static async assignBasket(req, res) {
    const { basketId, orderProductId, weight } = req.body;

    if (!basketId || !orderProductId || typeof weight !== "number") {
      return res.status(400).json({
        error: "Se requieren basketId, orderProductId y weight (como número)",
      });
    }

    try {
      const assigned =
        await OrderProductBasketService.assignBasketToOrderProduct({
          basketId,
          orderProductId,
          weightToReserve: weight,
        });

      return res.status(201).json({ data: assigned });
    } catch (error) {
      console.error("Error al asignar canasta:", error);
      return res.status(400).json({ error: error.message });
    }
  }
}

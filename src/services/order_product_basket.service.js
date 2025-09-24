import { Basket } from '../models/basket.model.js';
import { Order_Product } from '../models/order_product.model.js';
import { Order_Product_Basket } from '../models/order_product_basket.model.js';
import { Order_Product_State } from '../models/order_product_state.model.js';
import { OrderService } from './order.service.js';

export class OrderProductBasketService {
  static async collectProductFromBasket(orderProductBasketId) {
    const opb = await Order_Product_Basket.findByPk(orderProductBasketId, {
      include: {
        model: Basket,
      },
    });

    if (!opb) throw new Error('No se encontró la relación con la canasta');
    if (opb.isCollected) throw new Error('El producto ya fue recolectado');

  
    if (opb.Basket.weight < opb.weight) {
      throw new Error("La canasta no tiene suficiente peso para recolectar");
    }

    opb.Basket.weight -= opb.weight;
    opb.Basket.reserved -= opb.weight;
    opb.isCollected = true;

    await opb.Basket.save();
    await opb.save();

    const allBaskets = await Order_Product_Basket.findAll({
      where: { OrderProductId: opb.OrderProductId }
    });

    const allCollected = allBaskets.every(b => b.isCollected);

    if (allCollected) {
  
      const orderProduct = await Order_Product.findByPk(opb.OrderProductId);

      const completedState = await Order_Product_State.findOne({
        where: { name: "Completado" }
      });

      await orderProduct.update({
        OrderProductStateId: completedState.id
      });

      await OrderService.handleOrderCollected(orderProduct.OrderId);
    }

    return { message: "Producto recolectado correctamente" };
  }

  static async assignBasketToOrderProduct({
    basketId,
    orderProductId,
    weightToReserve,
  }) {
    const basket = await Basket.findByPk(basketId);
    if (!basket) throw new Error("No se encontró la canasta");

    const available = basket.weight - basket.reserved;
    if (available < weightToReserve) {
      throw new Error("No hay suficiente peso disponible en la canasta");
    }

    const orderProduct = await Order_Product.findByPk(orderProductId);
    if (!orderProduct) {
      throw new Error("No se encontró el producto del pedido");
    }

    const opb = await Order_Product_Basket.create({
      BasketId: basketId,
      OrderProductId: orderProductId,
      weight: weightToReserve,
      isCollected: false,
    });

    basket.reserved += weightToReserve;
    await basket.save();

    return opb;
  }
}
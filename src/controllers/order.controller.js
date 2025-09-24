import {
  validateOrder,
  validatePartialOrder,
  validateOrderComplete,
} from "../schemas/order.schema.js";
import { OrderService } from "../services/order.service.js";

export class orderController {
  static async createOrder(req, res) {
    const result = validateOrder(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await OrderService.createOrder(result.data);

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ data: response });
  }

  static async updateOrder(req, res) {
    const result = validatePartialOrder(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { id } = req.params;

    try {
      const updatedOrder = await OrderService.updateOrder(id, result.data);

      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.status(200).json({ data: updatedOrder });
    } catch (error) {
      console.error("Error al actualizar la Orden:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllOrdersNew(req, res) {
    try {
      const allOrders = await OrderService.getAllOrdersNew();

      if (allOrders) {
        return res.status(200).json(allOrders);
      } else {
        return res.status(500).json({ error: "Error getting orders" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllOrdersPrepare(req, res) {
    try {
      const allOrders = await OrderService.getAllOrdersPrepare();

      if (allOrders) {
        return res.status(200).json(allOrders);
      } else {
        return res.status(500).json({ error: "Error getting orders" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllOrdersDelivery(req, res) {
    try {
      const allOrders = await OrderService.getAllOrdersDelivery();

      if (allOrders) {
        return res.status(200).json(allOrders);
      } else {
        return res.status(500).json({ error: "Error getting orders" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getOneOrder(req, res) {
    try {
      const { id } = req.params;

      const response = await OrderService.getOneOrder(id);

      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to get order. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;

      const deleted = await OrderService.deleteOrder(id);

      if (deleted) {
        return res.status(200).json({ message: "Order successfully removed" });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to delete order. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async createOrderAllData(req, res) {
    const result = validateOrderComplete(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const response = await OrderService.createOrderCompleteData(result.data);

    if (!response.success) {
      return res.status(response.statusCode).json({
        error: response.message,
      });
    }

    return res.status(response.statusCode).json({
      data: response.order,
    });
  }

  static async markOrderAsCollected(req, res) {
    try {
      const { id } = req.params;

      const response = await OrderService.handleOrderCollected(id);

      if (!response.success) {
        return res.status(400).json({ message: response.message });
      }

      return res.status(200).json({
        message: response.message,
        data: response.repartidor || null,
      });
    } catch (error) {
      console.error("Error al marcar orden como recolectada:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  static async getOrdersByDeliveryAndLocation(req, res) {
    const { staffId, latitude, longitude } = req.query;

    try {
      const result = await OrderService.getOrdersByDeliveryAndLocation(
        staffId,
        latitude,
        longitude
      );

      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener los pedidos",
        error: error.message,
      });
    }
  }
}

import {
  validateOrderStates,
  validatePartialOrderStates,
} from "../schemas/order_states.schema.js";
import { Order_StatesService } from "../services/order-states.service.js";

export class order_StatesController {
  static async createOrder_State(req, res) {
    const result = validateOrderStates(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await Order_StatesService.createOrder_States(result.data);

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ data: response });
  }

  static async updateOrder_State(req, res) {
    const result = validatePartialOrderStates(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { id } = req.params;

    try {
      const updatedOrder_States = await Order_StatesService.updateOrder_States(id, result.data);

      if (!updatedOrder_States) {
        return res.status(404).json({ error: "Order State not found" });
      }

      return res.status(200).json({ data: updatedOrder_States });
    } catch (error) {
      console.error("Error al actualizar el Estado de la Orden:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllOrder_States(req, res) {
    try {
      const allOrder_States = await Order_StatesService.getAllOrder_States();

      if (allOrder_States) {
        return res.status(200).json(allOrder_States);
      } else {
        return res.status(500).json({ error: "Error getting order states" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getOneOrder_State(req, res) {
    try {
      const { id } = req.params;

      const response = await Order_StatesService.getOneOrder_States(id);

      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to get order state. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteOrder_State(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Order_StatesService.deleteOrder_States(id);

      if (deleted) {
        return res.status(200).json({ message: "Order State successfully removed" });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to delete order state. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

import {
  validateProductOrderState,
  validatePartialOrderProductState,
} from "../schemas/order_prodcut_state.schema.js";
import { Order_Product_StateService } from "../services/order-product-state.service.js";

export class order_Product_StateController {
  static async createOrder_Product_State(req, res) {
    const result = validateProductOrderState(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await Order_Product_StateService.createOrder_Product_State(
      result.data
    );

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ data: response });
  }

  static async updateOrder_Product_State(req, res) {
    const result = validatePartialOrderProductState(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { id } = req.params;

    try {
      const updatedOrder_Product_State =
        await Order_Product_StateService.updateOrder_Product_State(
          id,
          result.data
        );

      if (!updatedOrder_Product_State) {
        return res.status(404).json({ error: "Order Product State not found" });
      }

      return res.status(200).json({ data: updatedOrder_Product_State });
    } catch (error) {
      console.error(
        "Error al actualizar el Estado de la Orden del Producto:",
        error
      );
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllOrder_Product_State(req, res) {
    try {
      const allOrder_Product_State =
        await Order_Product_StateService.getAllOrder_Product_State();

      if (allOrder_Product_State) {
        return res.status(200).json(allOrder_Product_State);
      } else {
        return res
          .status(500)
          .json({ error: "Error getting order product state" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getOneOrder_Product_State(req, res) {
    try {
      const { id } = req.params;

      const response =
        await Order_Product_StateService.getOneOrder_Product_State(id);

      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res
          .status(404)
          .json({
            error: "Failed to get order product state. It may not exist.",
          });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteOrder_Product_State(req, res) {
    try {
      const { id } = req.params;

      const deleted =
        await Order_Product_StateService.deleteOrder_Product_State(id);

      if (deleted) {
        return res
          .status(200)
          .json({ message: "Order Product State successfully removed" });
      } else {
        return res
          .status(404)
          .json({
            error: "Failed to delete order product state. It may not exist.",
          });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

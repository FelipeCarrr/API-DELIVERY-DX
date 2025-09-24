import {
  validateOrder_Product,
  validatePartialOrder_Product,
} from "../schemas/order_product.schema.js";
import { Order_ProductService } from "../services/order_product.service.js";

export class order_ProductController {
  static async createOrder_Product(req, res) {
    const result = validateOrder_Product(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await Order_ProductService.createOrder_Product(
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

  static async updateOrder_Product(req, res) {
    const result = validatePartialOrder_Product(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { id } = req.params;

    try {
      const updatedOrder_Product =
        await Order_ProductService.updateOrder_Product(id, result.data);

      if (!updatedOrder_Product) {
        return res.status(404).json({ error: "Order Product not found" });
      }

      return res.status(200).json({ data: updatedOrder_Product });
    } catch (error) {
      console.error("Error al actualizar la Order del Producto:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllOrder_Products(req, res) {
    try {
      const allOrder_Product =
        await Order_ProductService.getAllOrder_Products();

      if (allOrder_Product) {
        return res.status(200).json(allOrder_Product);
      } else {
        return res.status(500).json({ error: "Error getting order products" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getOneOrder_Product(req, res) {
    try {
      const { id } = req.params;

      const response = await Order_ProductService.getOneOrder_Product(id);

      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to get order product. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteOrder_Product(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Order_ProductService.deleteOrder_Product(id);

      if (deleted) {
        return res
          .status(200)
          .json({ message: "Order Product successfully removed" });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to delete order product. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  static async getProductsByOrderId(req, res) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "El parámetro orderId es obligatorio" });
    }

    try {
      const products = await Order_ProductService.getProductsByOrderId(id);
      return res.status(200).json(products);
    } catch (error) {
      console.error(
        "Error en el controlador al obtener productos del pedido:",
        error
      );
      return res
        .status(500)
        .json({ message: "Error al obtener los productos del pedido" });
    }
  }

  static async getOneOrder_Product(req, res) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "El parámetro id es obligatorio" });
    }

    try {
      const orderProduct = await Order_ProductService.getOrderProductById(id);
      if (orderProduct) {
        return res.status(200).json(orderProduct);
      } else {
        return res.status(404).json({ message: "Order Product not found" });
      }
    } catch (error) {
      console.error("Error al obtener el Order Product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

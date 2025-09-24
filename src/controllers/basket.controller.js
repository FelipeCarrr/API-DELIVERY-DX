import {
  validateBasket,
  validatePartialBasket,
} from "../schemas/basket.schema.js";
import { BasketService } from "../services/basket.service.js";

export class basketController {
  static async createBasket(req, res) {
    const result = validateBasket(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await BasketService.createBasket(result.data);

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ data: response });
  }

  static async updateBasket(req, res) {
    const result = validatePartialBasket(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { id } = req.params;

    try {
      const updatedBasket = await BasketService.updateBasket(id, result.data);

      if (!updatedBasket) {
        return res.status(404).json({ error: "Basket not found" });
      }

      return res.status(200).json({ data: updatedBasket });
    } catch (error) {
      console.error("Error al actualizar la Canasta:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllBaskets(req, res) {
    try {
      const allBaskets = await BasketService.getAllBaskets();

      if (allBaskets) {
        return res.status(200).json(allBaskets);
      } else {
        return res.status(500).json({ error: "Error getting baskets" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getOneBasket(req, res) {
    try {
      const { id } = req.params;

      const response = await BasketService.getOneBasket(id);

      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to get basket. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteBasket(req, res) {
    try {
      const { id } = req.params;

      const deleted = await BasketService.deleteBasket(id);

      if (deleted) {
        return res.status(200).json({ message: "Basket successfully removed" });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to delete basket. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

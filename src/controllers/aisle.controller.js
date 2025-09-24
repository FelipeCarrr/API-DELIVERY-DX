import { AisleService } from "../services/aisle.service.js";
import { validateAisles } from "../schemas/aisle.schema.js";

export class aisleController {
  static async createAisle(req, res) {
    const result = validateAisles(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await AisleService.createAisle(result.data);

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ data: response });
  }

  static async getAllAisles(req, res) {
    try {
      const allAisles = await AisleService.getAllAisles();

      if (allAisles) {
        return res.status(200).json({ data: allAisles });
      } else {
        return res.status(500).json({ error: "Error getting aisles" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteAisle(req, res) {
    try {
      const { number } = req.params;

      const deleted = await AisleService.deleteAisle(number);

      if (deleted) {
        return res.status(200).json({ message: "Aisle successfully removed" });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to delete aisle. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllDataAisle(req, res) {
    try {
      const response = await AisleService.getAllDataAisle();
      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res.status(404).json({ error: "Error getting aisles" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

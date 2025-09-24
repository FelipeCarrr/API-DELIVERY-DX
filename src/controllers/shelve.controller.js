import { validateShelve } from "../schemas/shelve.schema.js";
import { ShelveService } from "../services/shelve.service.js";

export class shelveController {
  static async createShelve(req, res) {
    const result = validateShelve(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await ShelveService.createShelve(result.data);

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ data: response });
  }

  static async getOneShelve(req, res) {
    try {
      const result = validateShelve(req.body);

      if (result.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const response = await ShelveService.getOneShelve(result.data);

      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to get shelve. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllShelveToOneAisle(req, res) {
    try {
      const { number } = req.params;
      const response = await ShelveService.getAllShelveToOneAisle(number);

      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to get shelves. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteShelve(req, res) {
    try {
      const result = validateShelve(req.body);

      if (result.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const deleted = await ShelveService.deleteShelve(result.data);

      if (deleted) {
        return res.status(200).json({ message: "Shelve successfully removed" });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to delete shelve. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateShelve(req, res) {
    try {
      const id = req.params.id;
      const data = {
        newBoxesPerLevel: req.body.newBoxesPerLevel,
      };

      const updatedShelve = await ShelveService.updateShelve(id, data);
      if (updatedShelve) {
        return res.status(200).json({ message: "Estante actualizado con éxito." });
      } else {
        return res.status(400).json({ message: "No se pudo actualizar el estante." });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

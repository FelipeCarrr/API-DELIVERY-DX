import { TypeService } from "../services/type.service.js";
import { validateType } from "../schemas/type.schema.js";

export class typeController {
  static async createType(req, res) {
    const result = validateType(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await TypeService.createType(result.data);

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ data: response });
  }

  static async getAllTypes(req, res) {
    try {
      const allTypes = await TypeService.getAllTypes();

      if (allTypes) {
        return res.status(200).json(allTypes);
      } else {
        return res.status(500).json({ error: "Error getting types" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteType(req, res) {
    try {
      const { name } = req.params;

      const deleted = await TypeService.deleteType(name);

      if (deleted) {
        return res.status(200).json({ message: "Type successfully removed" });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to delete type. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

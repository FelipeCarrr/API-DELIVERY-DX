import { AdministrationService } from "../services/administration.service.js";
import { validateAdministration } from "../schemas/administration.schema.js";
import { getReverseGeocoding } from "../utils/geocoding.js";

export class AdministrationController {
  static async createAdministration(req, res) {
    try {
      const result = validateAdministration(req.body);

      if (result.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const administration = await AdministrationService.createAdministration(
        result.data
      );
      return res.status(201).json(administration);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getOneAdministration(req, res) {
    try {
      const { id } = req.params;
      const administration = await AdministrationService.getOneAdministration(
        id
      );

      if (!administration) {
        return res.status(404).json({ error: "Administración no encontrada" });
      }

      return res.json(administration);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAllAdministrations(req, res) {
    try {
      const administrations =
        await AdministrationService.getAllAdministrations();
      return res.json(administrations);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteAdministration(req, res) {
    try {
      const { id } = req.params;
      const deleted = await AdministrationService.deleteAdministration(id);

      if (!deleted) {
        return res.status(404).json({ error: "Administración no encontrada" });
      }

      return res.json({ message: "Administración eliminada correctamente" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateAdministration(req, res) {
    try {
      const { id } = req.params;
      const result = validateAdministration(req.body);

      if (result.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const address = await getReverseGeocoding(
        result.data.latitude,
        result.data.longitude
      );

      const administration = await AdministrationService.updateAdministration(
        id,
        {
          ...result.data,
          address,
        }
      );
      return res.json(administration);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getDataAdministrationCreated(req, res) {
    try {
      const administrations =
        await AdministrationService.getDataAdministrationCreated();
      return res.json(administrations);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

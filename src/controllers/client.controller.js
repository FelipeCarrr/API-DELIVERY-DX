import {
  validateClient,
  validatePartialClient,
} from "../schemas/client.shema.js";
import { ClientService } from "../services/client.service.js";
import { getGeocoding } from "../utils/geocoding.js";

export class clientController {
  static async createClient(req, res) {
    const result = validateClient(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    if (result.data.address && result.data.address.length > 0) {
      const geocodedAddresses = await Promise.all(
        result.data.address.map(async (addr) => {
          const geocodingResult = await getGeocoding(addr.direction);
          if (!geocodingResult) {
            return null;
          }
          return {
            ...addr,
            latitude: geocodingResult.lat,
            longitude: geocodingResult.lng,
            verified: false,
          };
        })
      );
      result.data.address = geocodedAddresses;
    }

    if (result.data.address.some((addr) => addr === null)) {
      return res.status(404).json({
        error: "No results found for one or more addresses.",
      });
    }

    const response = await ClientService.createClient(result.data);

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ data: response });
  }

  static async updateClient(req, res) {
    const result = validatePartialClient(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { id } = req.params;

    if (result.data.address && result.data.address.length > 0) {
      const geocodedAddresses = await Promise.all(
        result.data.address.map(async (addr) => {
          const geocodingResult = await getGeocoding(addr.direction);
          if (!geocodingResult) {
            return null;
          }
          return {
            ...addr,
            latitude: geocodingResult.lat,
            longitude: geocodingResult.lng,
            verified: false,
          };
        })
      );
      result.data.address = geocodedAddresses;
    }

    if (result.data.address.some((addr) => addr === null)) {
      return res.status(404).json({
        error: "No results found for one or more addresses.",
      });
    }

    for (const address of result.data.address) {
      if (
        !address.direction ||
        !address.contactName ||
        !address.contactPhone ||
        !address.latitude ||
        !address.longitude
      ) {
        return res.status(400).json({
          error: "All address fields must be provided.",
        });
      }
    }

    try {
      const updatedClient = await ClientService.updateClient(id, result.data);

      if (!updatedClient) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.status(200).json({ data: updatedClient });
    } catch (error) {
      console.error("Error al actualizar el Cliente:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllClients(req, res) {
    try {
      const allClients = await ClientService.getAllClients();

      if (allClients) {
        return res.status(200).json(allClients);
      } else {
        return res.status(500).json({ error: "Error getting clients" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getOneClient(req, res) {
    try {
      const { id } = req.params;

      const response = await ClientService.getOneClient(id);

      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to get client. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteClient(req, res) {
    try {
      const { id } = req.params;

      const deleted = await ClientService.deleteClient(id);

      if (deleted) {
        return res.status(200).json({ message: "Client successfully removed" });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to delete client. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

import { AddressService } from "../services/address.service.js";
import {
  validateAddress,
  validateUpdateAddress,
} from "../schemas/address.schema.js";
import { getGeocoding } from "../utils/geocoding.js";

export class AddressController {
  static async createAddress(req, res) {
    const { error, data } = validateAddress(req.body);

    if (error) {
      return res.status(400).json({ error: JSON.parse(error.message) });
    }
    const geocoding = await getGeocoding(data.direction);
    if (!geocoding) {
      return res.status(400).json({
        error: {
          message: "Invalid address or geocoding service unavailable.",
        },
      });
    }
    data.longitude = geocoding.lng;
    data.latitude = geocoding.lat;
    const response = await AddressService.createAddress({ ...data });

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has occurred.",
        },
      });
    }

    return res.status(201).json({ data: response });
  }
  static async getAddressById(req, res) {
    const { id } = req.params;
    const response = await AddressService.getAddressById(id);

    if (!response) {
      return res.status(404).json({
        error: {
          message: "Address not found.",
        },
      });
    }

    return res.status(200).json({ data: response });
  }
  static async getAddressByClientId(req, res) {
    const { clientId } = req.params;
    const response = await AddressService.getAddressByClientId(clientId);

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: {
          message: "No addresses found for this client.",
        },
      });
    }

    return res.status(200).json({ data: response });
  }
  static async updateAddress(req, res) {
    const { error, data } = validateUpdateAddress(req.body);

    if (error) {
      return res.status(400).json({ error: JSON.parse(error.message) });
    }

    const response = await AddressService.updateAddress(data);

    if (!response) {
      return res.status(404).json({
        error: {
          message: "Address not found or could not be updated.",
        },
      });
    }

    return res.status(200).json({ data: response });
  }
  static async deleteAddress(req, res) {
    const { id } = req.params;
    const response = await AddressService.deleteAddress(id);

    if (!response) {
      return res.status(404).json({
        error: {
          message: "Address not found or could not be deleted.",
        },
      });
    }

    return res.status(204).send();
  }
  static async getAllAddresses(req, res) {
    const response = await AddressService.getAllAddresses();

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: {
          message: "No addresses found.",
        },
      });
    }

    return res.status(200).json({ data: response });
  }
  static async verifyAddress(req, res) {
    const { id } = req.params;
    const address = await AddressService.getAddressById(id);

    if (!address) {
      return res.status(404).json({
        error: {
          message: "Address not found.",
        },
      });
    }

    const response = await AddressService.verifyAddress({
      address,
    });

    if (!response) {
      return res.status(500).json({
        error: {
          message: "Failed to verify address.",
        },
      });
    }

    return res.status(200).json({ data: response });
  }
  static async getAddressByOrder(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: {
          message: "Order ID is required.",
        },
      });
    }

    const response = await AddressService.getAddressByOrder(id);

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: {
          message: "No addresses found for this order.",
        },
      });
    }

    return res.status(200).json({ data: response });
  }

  static async getDistinctAddresses(req, res) {
    try {
      const { id } = req.params;

      const addresses = await AddressService.getDistinctLatLngByStaff(id);

      if (addresses.length === 0) {
        return res.status(204).json({});
      }

      if (!addresses) {
        return res
          .status(404)
          .json({ message: "No se encontraron direcciones para este staff" });
      }

      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener direcciones" });
    }
  }
}

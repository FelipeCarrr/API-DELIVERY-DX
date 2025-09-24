import { Address } from "../models/address.model.js";
import { Order } from "../models/order.model.js";
import { Order_Staff } from "../models/order_staff.model.js";
import sequelize from "../utils/config-mysql.js";

export class AddressService {
  static async createAddress(address) {
    try {
      const result = await Address.create(address);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAllAddresses() {
    try {
      const allAddresses = await Address.findAll();
      return allAddresses;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteAddress(id) {
    try {
      const deletedRows = await Address.destroy({
        where: {
          id: id,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The address does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAddressByClientId(clientId) {
    try {
      const result = await Address.findAll({
        where: {
          ClientId: clientId,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getAddressById(id) {
    try {
      const result = await Address.findOne({
        where: {
          id: id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async verifyAddress(address) {
    try {
      const result = await Address.update(
        {
          verified: true,
          longitude: address.longitude,
          latitude: address.latitude,
        },
        {
          where: {
            id: address.id,
          },
        }
      );
      if (result[0] > 0) {
        return true;
      } else {
        console.log("The address does not exist, it cannot be verified.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAddressByOrder(id) {
    try {
      const result = await Order.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Address,
          },
        ],
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async updateAddress(address) {
    try {
      const result = await Address.update(
        {
          longitude: address.longitude,
          latitude: address.latitude,
          verified: true,
        },
        {
          where: {
            id: address.id,
          },
        }
      );
      if (result[0] > 0) {
        return true;
      } else {
        console.log("The address does not exist, it cannot be updated.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getDistinctLatLngByStaff(staffId) {
    const rows = await Order.findAll({
      attributes: [
        [sequelize.col("Address.latitude"), "latitude"],
        [sequelize.col("Address.longitude"), "longitude"],
      ],
      include: [
        { model: Address, attributes: [], required: true }, // sin "as"
        {
          model: Order_Staff, // sin "as"
          attributes: [],
          required: true,
          where: {
            ID_repartidor: staffId,
          },
        },
      ],
      group: [
        sequelize.col("Address.latitude"),
        sequelize.col("Address.longitude"),
      ],
      raw: true,
    });

    // MySQL devuelve DECIMAL como string
    return rows.map((r) => ({
      latitude: Number(r.latitude),
      longitude: Number(r.longitude),
    }));
  }
}

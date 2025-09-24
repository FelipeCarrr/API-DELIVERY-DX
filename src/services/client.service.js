import { Client } from "../models/client.model.js";
import { Address } from "../models/address.model.js";
import sequelize from "../utils/config-mysql.js";
import e from "express";

export class ClientService {
  static async createClient(data) {
    try {
      const client = await Client.create({
        name: data.name,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
      });

      if (data.address && data.address.length > 0) {
        const addresses = data.address.map((address) => ({
          direction: address.direction,
          contactName: address.contactName,
          contactPhone: address.contactPhone,
          latitude: address.latitude,
          longitude: address.longitude,
          verified: address.verified,
          ClientId: client.id, // Associate address with the created client
        }));

        await Address.bulkCreate(addresses);
      }

      return client;
    } catch (error) {
      console.log("Error al crear el Cliente:", error);
      throw error;
    }
  }
  static async updateClient(id, data) {
    const transaction = await sequelize.transaction();
    try {
      const client = await Client.findOne({
        where: { id: id },
      });
      if (!client) {
        throw new Error(`Client with id ${id} not found`);
      }

      const updateClient = await client.update(
        {
          name: data.name,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
        },
        { transaction }
      );

      if (data.address && data.address.length > 0) {
        const currentAddresses = await Address.findAll({
          where: { ClientId: id },
          transaction,
        });

        const incomingDirections = data.address.map((addr) => addr.direction);

        for (const existing of currentAddresses) {
          if (!incomingDirections.includes(existing.direction)) {
            await existing.destroy({ transaction });
          }
        }

        for (const address of data.address) {
          const existingAddress = await Address.findOne({
            where: { direction: address.direction, ClientId: id },
          });

          if (existingAddress) {
            await existingAddress.update(
              {
                contactName: address.contactName,
                contactPhone: address.contactPhone,
                latitude: existingAddress.latitude,
                longitude: existingAddress.longitude,
                verified: existingAddress.verified,
                ClientId: id,
              },
              { transaction }
            );
          } else {
            if (
              address.direction &&
              address.contactName &&
              address.contactPhone &&
              address.latitude &&
              address.longitude
            ) {
              await Address.create(
                {
                  direction: address.direction,
                  contactName: address.contactName,
                  contactPhone: address.contactPhone,
                  latitude: address.latitude,
                  longitude: address.longitude,
                  verified: false,
                  ClientId: id,
                },
                { transaction }
              );
            }
          }
        }
      } else {
        await Address.destroy({
          where: { ClientId: id },
          transaction,
        });
      }
      await transaction.commit();
      return updateClient;
    } catch (error) {
      console.log("Error al actualizar el Cliente:", error);
      throw error;
    }
  }
  static async getAllClients() {
    try {
      const allClients = await Client.findAll();
      return allClients;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  static async getOneClient(id) {
    try {
      const getOne = await Client.findOne({
        where: {
          id: id,
        },
        include: Address,
      });
      return getOne;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  static async deleteClient(id) {
    try {
      const deletedRows = await Client.destroy({
        where: {
          id: id,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The client does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

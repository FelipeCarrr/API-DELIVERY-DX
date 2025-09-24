import { Administration } from "../models/administration.model.js";

export class AdministrationService {
  static async createAdministration(data) {
    try {
      const administration = await Administration.create({
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        radius: data.radius,
        address: data.address,
      });
      return administration;
    } catch (error) {
      console.error("Error al crear la administración:", error);
      throw error;
    }
  }

  static async getOneAdministration(id) {
    try {
      const administration = await Administration.findOne({
        where: { id },
      });
      return administration;
    } catch (error) {
      console.error("Error al obtener la administración:", error);
      return null;
    }
  }

  static async getAllAdministrations() {
    try {
      const administrations = await Administration.findAll();
      return administrations;
    } catch (error) {
      console.error("Error al obtener las administraciones:", error);
      return null;
    }
  }

  static async updateAdministration(id, data) {
    try {
      const administration = await Administration.findOne({
        where: { id },
      });

      if (!administration) {
        throw new Error(`Administración con id ${id} no encontrada.`);
      }

      await administration.update({
        name: data.name ?? administration.name,
        latitude: data.latitude ?? administration.latitude,
        longitude: data.longitude ?? administration.longitude,
        radius: data.radius ?? administration.radius,
        address: data.address ?? administration.address,
      });

      return administration;
    } catch (error) {
      console.error("Error al actualizar la administración:", error);
      throw error;
    }
  }

  static async deleteAdministration(id) {
    try {
      const deletedRows = await Administration.destroy({
        where: { id },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("La administración no existe, no se puede eliminar.");
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar la administración:", error);
      return false;
    }
  }

  static async getDataAdministrationCreated() {
    try {
      const administrations = await Administration.findAll();
      return administrations;
    } catch (error) {
      console.error("Error al obtener las administraciones creadas:", error);
      return null;
    }
  }

  static async getAddress() {
    try {
      const administrations = await Administration.findAll({
        attributes: ["address"],
      });
      return administrations.map((admin) => admin.address);
    } catch (error) {
      console.error(
        "Error al obtener las direcciones de las administraciones:",
        error
      );
      return null;
    }
  }
}

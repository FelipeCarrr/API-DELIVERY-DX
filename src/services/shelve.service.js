import { Aisle } from "../models/aisle.model.js";
import { Level } from "../models/level.model.js";
import { Shelve } from "../models/shelve.model.js";

export class ShelveService {
  static async createShelve(data) {
    try {
      const aisle = await Aisle.findOrCreate({
        where: {
          number: data.numberAisle,
        },
        defaults: {
          number: data.numberAisle,
        },
      });

      const shelve = await Shelve.create({
        number: data.numberShelve,
        AisleId: aisle[0].id,
      });

      return shelve;
    } catch (error) {
      console.error("Error al crear el estante:", error);
      throw error;
    }
  }

  static async getOneShelve(data) {
    try {
      const aisle = await Aisle.findOne({
        where: {
          number: data.numberAisle,
        },
      });
      const getOne = await Shelve.findOne({
        where: {
          number: data.numberShelve,
          AisleId: aisle.id,
        },
      });

      return getOne;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getAllShelveToOneAisle(number) {
    try {
      const aisle = await Aisle.findOne({
        where: {
          number: number,
        },
      });
      const getall = await Shelve.findAll({
        where: {
          AisleId: aisle.id,
        },
      });

      return getall;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteShelve(data) {
    try {
      const aisle = await Aisle.findOne({
        where: {
          number: data.numberAisle,
        },
      });
      const deletedRows = await Shelve.destroy({
        where: {
          number: data.numberShelve,
          AisleId: aisle.id,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The shelve does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async updateShelve(id, data) {
    try {
      const shelve = await Shelve.findOne({
        where: { id },
        include: [Level],
      });

      if (!shelve) {
        throw new Error("El estante no existe.");
      }

      const minAvailable = Math.min(
        ...shelve.Levels.map((level) => level.avalaible)
      );

      if (data.newBoxesPerLevel < minAvailable) {
        throw new Error(
          `No se puede reducir la capacidad a ${data.newBoxesPerLevel} baskets por nivel, ya que el mínimo disponible en algún nivel es ${minAvailable}.`
        );
      }

      const capacityDifference =
        data.newBoxesPerLevel - shelve.Levels[0].amount;

      for (let level of shelve.Levels) {
        const newAvalaible = level.avalaible + capacityDifference;
        const newAmount = level.amount + capacityDifference;

        await Level.update(
          {
            avalaible: newAvalaible,
            amount: newAmount,
          },
          { where: { id: level.id } }
        );
      }

      return shelve;
    } catch (error) {
      console.error("Error al editar el estante:", error);
      throw error;
    }
  }
}

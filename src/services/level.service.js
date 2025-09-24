import { Level } from "../models/level.model.js";

export class LevelService {
  static async createLevel(data) {
    try {
      const level = await Level.create({
        amount: data.numberAmount,
        number: data.numberLevel,
        ShelveId: data.shelveId,
        avalaible: data.avalaible,
      });

      return level;
    } catch (error) {
      console.error("Error al crear el Nivel:", error);
      throw error;
    }
  }

  static async getAllLevels() {
    try {
      const allLevels = await Level.findAll();
      return allLevels;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getOneLevel(id) {
    try {
      const getOne = await Level.findOne({
        where: {
          id: id,
        },
      });
      return getOne;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteLevel(id) {
    try {
      const deletedRows = await Level.destroy({
        where: {
          id: id,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The level does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async adjustLevelsForShelve(shelveId, newLevels, newBoxesPerLevel) {
    try {
      const levels = await Level.findAll({
        where: {
          ShelveId: shelveId,
        },
        order: [['number', 'ASC']]
      });

      // Validar reducción
      if (newLevels < levels.length) {
        throw new Error("No se puede reducir la cantidad de niveles por debajo del número actual.");
      }

      const minBoxesAvailable = Math.min(...levels.map(lvl => lvl.avalaible));

      if (newBoxesPerLevel < minBoxesAvailable) {
        throw new Error(`No se puede reducir la cantidad de cajas por nivel a menos de ${minBoxesAvailable}.`);
      }

      // Ajustar niveles y cajas
      for (let level of levels) {
        level.amount = newBoxesPerLevel;
        level.avalaible = Math.min(level.avalaible, newBoxesPerLevel);
        await level.save();
      }

      // Agregar nuevos niveles si es necesario
      for (let i = levels.length + 1; i <= newLevels; i++) {
        await Level.create({
          number: i,
          amount: newBoxesPerLevel,
          avalaible: newBoxesPerLevel,
          ShelveId: shelveId,
        });
      }

      return true;
    } catch (error) {
      console.error("Error al ajustar los niveles:", error);
      throw error;
    }
  }
}

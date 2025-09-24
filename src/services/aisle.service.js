import { Aisle } from "../models/aisle.model.js";
import { Level } from "../models/level.model.js";
import { Shelve } from "../models/shelve.model.js";

export class AisleService {
  static async createAisle(aisle) {
    try {
      const result = await Aisle.findOrCreate({
        where: {
          number: aisle.number,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAllAisles() {
    try {
      const allAisles = await Aisle.findAll();
      return allAisles;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteAisle(number) {
    try {
      const deletedRows = await Aisle.destroy({
        where: {
          number: number,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The aisle does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAllDataAisle() {
    try {
      const res = await Aisle.findAll({
        include: [
          {
            model: Shelve,
            include: [
              {
                model: Level,
              },
            ],
          },
        ],
      });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async createData() {
    try {
      const aisle1 = await Aisle.findOrCreate({
        where: {
          number: 1,
        },
        defaults: {
          number: 1,
        },
      });

      const aisle2 = await Aisle.findOrCreate({
        where: {
          number: 2,
        },
        defaults: {
          number: 2,
        },
      });

      const shelve11 = await Shelve.findOrCreate({
        where: {
          number: 1,
          AisleId: aisle1[0].id,
        },
      });

      const shelve12 = await Shelve.findOrCreate({
        where: {
          number: 2,
          AisleId: aisle1[0].id,
        },
      });

      await Level.findOrCreate({
        where: {
          number: 1,
          ShelveId: shelve11[0].id,
        },
        defaults: {
          amount: 3,
          number: 1,
          avalaible: 3,
          ShelveId: shelve11[0].id,
        },
      });

      await Level.findOrCreate({
        where: {
          number: 2,
          ShelveId: shelve11[0].id,
        },
        defaults: {
          amount: 3,
          number: 2,
          avalaible: 3,
          ShelveId: shelve11[0].id,
        },
      });

      await Level.findOrCreate({
        where: {
          number: 1,
          ShelveId: shelve12[0].id,
        },
        defaults: {
          amount: 3,
          number: 1,
          avalaible: 3,
          ShelveId: shelve12[0].id,
        },
      });

      await Level.findOrCreate({
        where: {
          number: 2,
          ShelveId: shelve12[0].id,
        },
        defaults: {
          amount: 3,
          number: 2,
          avalaible: 3,
          ShelveId: shelve12[0].id,
        },
      });

      const shelve21 = await Shelve.findOrCreate({
        where: {
          number: 1,
          AisleId: aisle2[0].id,
        },
        defaults: {
          number: 1,
          AisleId: aisle2[0].id,
        },
      });

      const shelve22 = await Shelve.findOrCreate({
        where: {
          number: 2,
          AisleId: aisle2[0].id,
        },
        defaults: {
          number: 2,
          AisleId: aisle2[0].id,
        },
      });

      await Level.findOrCreate({
        where: {
          number: 1,
          ShelveId: shelve21[0].id,
        },
        defaults: {
          amount: 3,
          number: 1,
          avalaible: 3,
          ShelveId: shelve21[0].id,
        },
      });

      await Level.findOrCreate({
        where: {
          number: 2,
          ShelveId: shelve21[0].id,
        },
        defaults: {
          amount: 3,
          number: 2,
          avalaible: 3,
          ShelveId: shelve21[0].id,
        },
      });

      await Level.findOrCreate({
        where: {
          number: 1,
          ShelveId: shelve22[0].id,
        },
        defaults: {
          amount: 3,
          number: 1,
          avalaible: 3,
          ShelveId: shelve22[0].id,
        },
      });

      await Level.findOrCreate({
        where: {
          number: 2,
          ShelveId: shelve22[0].id,
        },
        defaults: {
          amount: 3,
          number: 2,
          avalaible: 3,
          ShelveId: shelve22[0].id,
        },
      });
    } catch (error) {
      console.error("Error al crear el estante:", error);
      throw error;
    }
  }
}

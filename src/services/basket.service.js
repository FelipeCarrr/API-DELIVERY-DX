import { Basket } from "../models/basket.model.js";
import { Products } from "../models/product.model.js";
import { Level } from "../models/level.model.js";
import { Shelve } from "../models/shelve.model.js";
import { Aisle } from "../models/aisle.model.js";

export class BasketService {
  static async createBasket(data) {
    try {
      const basket = await Basket.create({
        LevelId: data.levelId,
        weight: data.weight,
        ProductId: data.productId,
        productState: "DISPONIBLE",
        expiration: new Date(data.expiration),
      });

      const level = await Level.findOne({
        where: {
          id: data.levelId,
        },
      });

      console.log(level);

      await Level.update(
        {
          avalaible: level.avalaible - 1,
        },
        {
          where: {
            id: data.levelId,
          },
        }
      );

      return basket;
    } catch (error) {
      console.log("Error al crear la Canasta:", error);
      throw error;
    }
  }
  static async updateBasket(id, data) {
    try {
      const basket = await Basket.findOne({
        where: { id: id },
      });

      if (!basket) {
        throw new Error(`Basket with id ${id} not found`);
      }

      const level = await Level.findOne({
        where: { id: basket.LevelId },
      });

      await Level.update(
        {
          avalaible: level.avalaible + 1,
        },
        {
          where: { id: basket.LevelId },
        }
      );

      const updatedBasket = await basket.update({
        expiration: new Date(data.expiration),
        weight: data.weight,
        productState: data.productState,
        LevelId: data.levelId,
      });

      const newLevel = await Level.findOne({
        where: { id: data.levelId },
      });

      await Level.update(
        {
          avalaible: newLevel.avalaible - 1,
        },
        {
          where: { id: data.levelId },
        }
      );

      return updatedBasket;
    } catch (error) {
      console.log("Error al actualizar la Canasta:", error);
      throw error;
    }
  }
  static async getAllBaskets() {
    try {
      const allBaskets = await Basket.findAll({
        include: [
          {
            model: Products,
            attributes: ["name"],
          },
          {
            model: Level,
            attributes: ["number"],
            include: [
              {
                model: Shelve,
                attributes: ["number"],
                include: [
                  {
                    model: Aisle,
                    attributes: ["number"],
                  },
                ],
              },
            ],
          },
        ],
      });
      return allBaskets;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getOneBasket(id) {
    try {
      const getOne = await Basket.findOne({
        where: { id: id },
        include: [
          {
            model: Products,
            attributes: ["name"],
          },
          {
            model: Level,
            attributes: ["number"],
            include: [
              {
                model: Shelve,
                attributes: ["number", "id"],
                include: [
                  {
                    model: Aisle,
                    attributes: ["number", "id"],
                  },
                ],
              },
            ],
          },
        ],
      });

      return getOne;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  static async deleteBasket(id) {
    try {
      const data = await Basket.findOne({
        where: { id: id },
      });

      const level = await Level.findOne({
        where: { id: data.LevelId },
      });

      await Level.update(
        {
          avalaible: level.avalaible + 1,
        },
        {
          where: { id: data.LevelId },
        }
      );

      const deletedRows = await Basket.destroy({
        where: { id: id },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The basket does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log("Error during deleteBasket operation:", error);
      return false;
    }
  }
}

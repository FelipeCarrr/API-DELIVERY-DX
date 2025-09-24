import { Products } from "../models/product.model.js";
import { Products_Type } from "../models/product_type.model.js";
import { Type } from "../models/type.model.js";

export class TypeService {
  static async createType(type) {
    try {
      const result = await Type.findOrCreate({
        where: {
          name: type,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAllTypes() {
    try {
      const allTypes = await Type.findAll();
      return allTypes;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteType(type) {
    try {
      const deletedRows = await Type.destroy({
        where: {
          name: type,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The type does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async createTypes() {
    try {
      const type1 = await Type.findOrCreate({
        where: {
          name: "Granos",
        },
        defaults: {
          name: "Granos",
        },
      });

      const type2 = await Type.findOrCreate({
        where: {
          name: "Verduras",
        },
        defaults: {
          name: "Verduras",
        },
      });

      const type3 = await Type.findOrCreate({
        where: {
          name: "Hortalizas",
        },
        defaults: {
          name: "Hortalizas",
        },
      });

      const product1 = await Products.findOrCreate({
        where: {
          name: "Arroz",
        },
        defaults: {
          name: "Arroz",
        },
      });

      const product2 = await Products.findOrCreate({
        where: {
          name: "Pimenton",
        },
        defaults: {
          name: "Pimenton",
        },
      });

      const product3 = await Products.findOrCreate({
        where: {
          name: "Yuca",
        },
        defaults: {
          name: "Yuca",
        },
      });
      const product4 = await Products.findOrCreate({
        where: {
          name: "Zanahoria",
        },
        defaults: {
          name: "Zanahoria",
        },
      });

      await Products_Type.findOrCreate({
        where: {
          ProductId: product1[0].id,
          TypeId: type1[0].id,
        },
        defaults: {
          ProductId: product1[0].id,
          TypeId: type1[0].id,
        },
      });

      await Products_Type.findOrCreate({
        where: {
          ProductId: product2[0].id,
          TypeId: type2[0].id,
        },
        defaults: {
          ProductId: product2[0].id,
          TypeId: type2[0].id,
        },
      });

      await Products_Type.findOrCreate({
        where: {
          ProductId: product3[0].id,
          TypeId: type3[0].id,
        },
        defaults: {
          ProductId: product3[0].id,
          TypeId: type3[0].id,
        },
      });

      await Products_Type.findOrCreate({
        where: {
          ProductId: product4[0].id,
          TypeId: type3[0].id,
        },
        defaults: {
          ProductId: product4[0].id,
          TypeId: type3[0].id,
        },
      });
    } catch (error) {
      console.error("Error al crear el Tipo:", error);
      throw error;
    }
  }
}

import { Products_Type } from "../models/product_type.model";

export class Products_TypeService {
  static async createProducts_Type(product) {
    try {
      const result = await Products_Type.findOrCreate({
        where: {
          name: product.name,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAllProducts_Type() {
    try {
      const allProducts = await Products_Type.findAll();
      return allProducts;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteProducts_Type(products) {
    try {
      const deletedRows = await Products_Type.destroy({
        where: {
          name: products,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The product does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

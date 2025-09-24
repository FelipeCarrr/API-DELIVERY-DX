import { Products } from "../models/product.model.js";

export class ProductService {
  static async createProduct(product) {
    try {
      const result = await Products.findOrCreate({
        where: {
          name: product.name,
          image: product.image,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAllProducts() {
    try {
      const allProducts = await Products.findAll();
      return allProducts;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteProducts(products) {
    try {
      const deletedRows = await Products.destroy({
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

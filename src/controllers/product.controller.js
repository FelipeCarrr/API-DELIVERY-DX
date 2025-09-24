import { ProductService } from "../services/product.service.js";
import { validateProduct } from "../schemas/product.schema.js";

export class productController {
  static async createProduct(req, res) {
    const result = validateProduct(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await ProductService.createProduct(result.data);

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ data: response });
  }

  static async getAllProducts(req, res) {
    try {
      const allProducts = await ProductService.getAllProducts();

      if (allProducts) {
        return res.status(200).json(allProducts);
      } else {
        return res.status(500).json({ error: "Error getting products" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { name } = req.params;

      const deleted = await ProductService.deleteProducts(name);

      if (deleted) {
        return res
          .status(200)
          .json({ message: "Product successfully removed" });
      } else {
        return res
          .status(404)
          .json({ error: "Failed to delete product. It may not exist." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

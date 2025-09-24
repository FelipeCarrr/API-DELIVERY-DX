import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
const productRouter = Router();

productRouter.post("/createProduct", productController.createProduct);
productRouter.get("/getAll", productController.getAllProducts);
productRouter.delete("/deleteProduct/:name", productController.deleteProduct);

export default productRouter;

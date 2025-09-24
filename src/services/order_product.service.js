import { Aisle } from "../models/aisle.model.js";
import { Basket } from "../models/basket.model.js";
import { Level } from "../models/level.model.js";
import { Order_Product } from "../models/order_product.model.js";
import { Order_Product_Basket } from "../models/order_product_basket.model.js";
import { Products } from "../models/product.model.js";
import { Shelve } from "../models/shelve.model.js";

export class Order_ProductService {
  static async createOrder_Product(data) {
    try {
      const order_product = await Order_Product.create({
        weight: data.weight,
        ProductId: data.productId,
        OrderId: data.orderId,
        OrderProductStateId: data.orderProductId,
      });
      return order_product;
    } catch (error) {
      console.log("Error al crear la Orden del Producto:", error);
      throw error;
    }
  }

  static async updateOrder_Product(id, data) {
    try {
      const order_product = await Order_Product.findOne({
        where: { id: id },
      });

      if (!order_product) {
        throw new Error(`Order_Product with id ${id} not found`);
      }

      const updatedOrder_Product = await order_product.update({
        weight: data.weight,
        ProductId: data.productId,
      });

      return updatedOrder_Product;
    } catch (error) {
      console.log("Error al actualizar la Orden del Producto:", error);
      throw error;
    }
  }

  static async getAllOrder_Products() {
    try {
      const allOrder_Products = await Order_Product.findAll();
      return allOrder_Products;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getOneOrder_Product(id) {
    try {
      const getOne = await Order_Product.findOne({
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

  static async deleteOrder_Product(id) {
    try {
      const deletedRows = await Order_Product.destroy({
        where: {
          id: id,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The order product does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  static async getProductsByOrderId(id) {
    try {
      const orderProducts = await Order_Product.findAll({
        where: { OrderId: id },
        include: [
          {
            model: Products,
            as: "Product",
          },
          {
            model: Order_Product_Basket,
            as: "Order_Product_Basket",
            include: [
              {
                model: Basket,
                as: "Basket",
                include: [
                  {
                    model: Level,
                    as: "Level",
                    include: [
                      {
                        model: Shelve,
                        as: "Shelve",
                        include: [
                          {
                            model: Aisle,
                            as: "Aisle",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      return orderProducts;
    } catch (error) {
      console.error("Error al obtener productos del pedido:", error);
      throw error;
    }
  }
  static async getOrderProductById(id) {
    try {
      const orderProducts = await Order_Product.findAll({
        where: { id: id },
        include: [
          {
            model: Products,
            as: "Product",
          },
          {
            model: Order_Product_Basket,
            as: "Order_Product_Basket",
            include: [
              {
                model: Basket,
                as: "Basket",
                include: [
                  {
                    model: Level,
                    as: "Level",
                    include: [
                      {
                        model: Shelve,
                        as: "Shelve",
                        include: [
                          {
                            model: Aisle,
                            as: "Aisle",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      return orderProducts;
    } catch (error) {
      console.error("Error al obtener productos del pedido:", error);
      throw error;
    }
  }
}

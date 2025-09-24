import { Order_Product_State } from "../models/order_product_state.model.js";

export class Order_Product_StateService {
  static async createOrder_Product_State(data) {
    try {
      const order_product_state = await Order_Product_State.create({
        name: data.name,
      });
      return order_product_state;
    } catch (error) {
      console.log("Error al crear el Estado de la Orden del Producto:", error);
      throw error;
    }
  }

  static async updateOrder_Product_State(id, data) {
    try {
      const order_product_state = await Order_Product_State.findOne({
        where: { id: id },
      });

      if (!order_product_state) {
        throw new Error(`Order Product State with id ${id} not found`);
      }

      const updatedOrder_Product_State = await order_product_state.update({
        name: data.name,
      });

      return updatedOrder_Product_State;
    } catch (error) {
      console.log(
        "Error al actualizar el Estado de la Orden del Producto:",
        error
      );
      throw error;
    }
  }

  static async getAllOrder_Product_State() {
    try {
      const allOrder_Product_State = await Order_Product_State.findAll();
      return allOrder_Product_State;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getOneOrder_Product_State(id) {
    try {
      const getOne = await Order_Product_State.findOne({
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

  static async deleteOrder_Product_State(id) {
    try {
      const deletedRows = await Order_Product_State.destroy({
        where: {
          id: id,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log(
          "The order product state does not exist, it cannot be deleted."
        );
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

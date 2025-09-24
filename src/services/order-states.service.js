import { Order_States } from "../models/order_states.model.js";

export class Order_StatesService {
  static async createOrder_States(data) {
    try {
      const order_states = await Order_States.create({
        name: data.name,
      });
      return order_states;
    } catch (error) {
      console.log("Error al crear el Estado de la Orden:", error);
      throw error;
    }
  }

  static async updateOrder_States(id, data) {
    try {
      const order_states = await Order_States.findOne({
        where: { id: id },
      });

      if (!order_states) {
        throw new Error(`Order States with id ${id} not found`);
      }

      const updatedOrder_States = await order_states.update({
        name: data.name,
      });

      return updatedOrder_States;
    } catch (error) {
      console.log("Error al actualizar el Estado de la Orden:", error);
      throw error;
    }
  }

  static async getAllOrder_States() {
    try {
      const allOrder_States = await Order_States.findAll();
      return allOrder_States;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getOneOrder_States(id) {
    try {
      const getOne = await Order_States.findOne({
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

  static async deleteOrder_States(id) {
    try {
      const deletedRows = await Order_States.destroy({
        where: {
          id: id,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The order state does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

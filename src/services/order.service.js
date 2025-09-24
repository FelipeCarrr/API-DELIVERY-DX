import { Order } from "../models/order.model.js";
import { Client } from "../models/client.model.js";
import { Basket } from "../models/basket.model.js";
import { Order_States } from "../models/order_states.model.js";
import { Order_Product } from "../models/order_product.model.js";
import { Order_Product_State } from "../models/order_product_state.model.js";
import { Order_Product_Basket } from "../models/order_product_basket.model.js";
import { Products } from "../models/product.model.js";
import { Op } from "sequelize";
import sequelize from "../utils/config-mysql.js";
import { Order_Staff } from "../models/order_staff.model.js";
import { Staff } from "../models/staff.model.js";
import { Rol } from "../models/rol.model.js";
import { OrderStaffService } from "../services/order_staff.service.js";
import { Address } from "../models/address.model.js";

export class OrderService {
  static async createOrder(data) {
    const transaction = await sequelize.transaction();
    try {
      const newOrder = await Order.create(
        {
          ClientId: data.ClientId,
          OrderStateId: data.OrderStateId,
        },
        { transaction }
      );

      await Order_Staff.create(
        {
          OrderId: newOrder.id,
          ID_repartidor: null,
          ID_recolector: null,
          readyForDelivery: false,
        },
        { transaction }
      );

      const recolectorResult = await OrderStaffService.assignCollectorToOrder(
        newOrder.id
      );
      console.log(recolectorResult.message);

      await transaction.commit();

      return {
        success: true,
        message: "Orden creada exitosamente.",
        order: newOrder,
        recolectorAsignado: recolectorResult.success
          ? recolectorResult.recolector
          : null,
      };
    } catch (error) {
      await transaction.rollback();
      console.error("Error al crear la orden:", error);
      throw error;
    }
  }

  static async updateOrder(id, data) {
    try {
      const order = await Order.findOne({
        where: { id: id },
      });

      if (!order) {
        throw new Error(`Order with id ${id} not found`);
      }

      const updatedOrder = await order.update({
        OrderStatesId: data.OrderStatesId,
      });

      return updatedOrder;
    } catch (error) {
      console.log("Error al actualizar la Orden:", error);
      throw error;
    }
  }

  static async getAllOrdersNew() {
    try {
      const AllOrders = await Order.findAll({
        include: [
          {
            model: Client,
          },
          {
            model: Order_States,
            where: {
              name: "En proceso",
            },
          },
          {
            model: Order_Product,
            include: [
              {
                model: Order_Product_State,
              },
              {
                model: Order_Product_Basket,
                include: [
                  {
                    model: Basket,
                  },
                ],
              },
            ],
          },
          {
            model: Order_Staff,
            where: {
              ID_repartidor: null,
              ID_recolector: null,
            },
          },
        ],
      });
      return AllOrders;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getAllOrdersPrepare() {
    try {
      const AllOrders = await Order.findAll({
        include: [
          {
            model: Client,
          },
          {
            model: Order_States,
            where: {
              name: "En proceso",
            },
          },
          {
            model: Order_Product,
            include: [
              {
                model: Order_Product_State,
              },
              {
                model: Order_Product_Basket,
                include: [
                  {
                    model: Basket,
                  },
                ],
              },
            ],
          },
          {
            model: Order_Staff,
            where: {
              ID_repartidor: null,
              ID_recolector: {
                [Op.not]: null,
              },
            },
            include: [
              {
                model: Staff,
                as: "recolector",
              },
            ],
          },
        ],
      });
      return AllOrders;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getAllOrdersDelivery() {
    try {
      const AllOrders = await Order.findAll({
        include: [
          {
            model: Client,
          },
          {
            model: Order_States,
            where: {
              name: "Completado",
            },
          },
          {
            model: Order_Product,
            include: [
              {
                model: Order_Product_State,
              },
              {
                model: Order_Product_Basket,
                include: [
                  {
                    model: Basket,
                  },
                ],
              },
            ],
          },
          {
            model: Order_Staff,
            where: {
              ID_repartidor: {
                [Op.not]: null,
              },
              ID_recolector: null,
            },
            include: [
              {
                model: Staff,
                as: "repartidor",
              },
            ],
          },
        ],
      });
      return AllOrders;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getOneOrder(id) {
    try {
      const getOne = await Order.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Client,
          },
          {
            model: Order_States,
          },
          {
            model: Order_Product,
            include: [
              {
                model: Order_Product_State,
              },
              {
                model: Order_Product_Basket,
                include: [
                  {
                    model: Basket,
                  },
                ],
              },
              {
                model: Products,
              },
            ],
          },
        ],
      });
      return getOne;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteOrder(id) {
    try {
      const deletedRows = await Order.destroy({
        where: {
          id: id,
        },
      });

      if (deletedRows > 0) {
        return true;
      } else {
        console.log("The order does not exist, it cannot be deleted.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async createOrderCompleteData(data) {
    const transaction = await sequelize.transaction();

    try {
      const client = await Client.findOne({
        where: { email: data.email },
        transaction,
      });

      if (!client) {
        await transaction.rollback();
        return {
          success: false,
          statusCode: 404,
          message: `Cliente con email ${data.email} no encontrado`,
        };
      }

      for (const product of data.products) {
        const baskets = await Basket.findAll({
          where: {
            ProductId: product.productId,
            weight: { [Op.gt]: 0 },
          },
          transaction,
        });

        const totalWeight = baskets.reduce((acc, b) => acc + b.weight, 0);

        if (totalWeight < product.weight) {
          await transaction.rollback();
          return {
            success: false,
            statusCode: 400,
            message: `Stock insuficiente para el producto ${product.productId}`,
          };
        }
      }

      const [orderState, productState] = await Promise.all([
        Order_States.findOne({ where: { name: "En proceso" }, transaction }),
        Order_Product_State.findOne({
          where: { name: "En proceso" },
          transaction,
        }),
      ]);

      const order = await Order.create(
        {
          ClientId: client.id,
          OrderStateId: orderState.id,
          AddressId: data.addressId,
        },
        { transaction }
      );

      for (const product of data.products) {
        const orderProduct = await Order_Product.create(
          {
            weight: product.weight,
            OrderId: order.id,
            ProductId: product.productId,
            OrderProductStateId: productState.id,
          },
          { transaction }
        );

        const baskets = await Basket.findAll({
          where: {
            ProductId: product.productId,
            weight: { [Op.gt]: 0 },
          },
          order: [["weight", "ASC"]],
          transaction,
        });

        let weightToSubtract = product.weight;

        for (const basket of baskets) {
          if (weightToSubtract <= 0) break;

          const weightTaken = Math.min(basket.weight, weightToSubtract);

          await Order_Product_Basket.create(
            {
              weight: weightTaken,
              BasketId: basket.id,
              OrderProductId: orderProduct.id,
            },
            { transaction }
          );

          if (basket.weight === weightTaken) {
            await basket.update({ weight: 0 }, { transaction });
          } else {
            await basket.update(
              { reserved: basket.reserved + weightTaken },
              { transaction }
            );
          }

          weightToSubtract -= weightTaken;
        }
      }

      await Order_Staff.create({ OrderId: order.id }, { transaction });

      const recolectorResult = await OrderStaffService.assignCollectorToOrder(
        order.id,
        transaction
      );

      if (!recolectorResult.success) {
        await transaction.rollback();
        return {
          success: false,
          statusCode: 400,
          message: "No hay recolectores disponibles.",
        };
      }

      await transaction.commit();

      return {
        success: true,
        statusCode: 201,
        message: "Orden creada y recolector asignado",
        order,
        recolector: recolectorResult.success
          ? recolectorResult.recolector
          : null,
      };
    } catch (error) {
      await transaction.rollback();
      console.error("Error al crear la Orden completa:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Ocurrió un error al crear la orden completa.",
      };
    }
  }

  static async handleOrderCollected(orderId) {
    try {
      const productos = await Order_Product.findAll({
        where: { OrderId: orderId },
        include: [{ model: Order_Product_State }],
      });

      const allCollected = productos.every(
        (p) => p.Order_Product_State?.name === "Completado"
      );

      if (!allCollected) {
        return {
          success: false,
          message: "Aún hay productos sin recolectar.",
        };
      }

      const orderStaff = await Order_Staff.findOne({
        where: { OrderId: orderId },
      });

      if (!orderStaff) {
        throw new Error("Order_Staff no encontrado.");
      }

      const order = await Order.findByPk(orderId);
      if (!order) throw new Error("Orden no encontrada.");

      await orderStaff.update({ readyForDelivery: true });

      const recolectorId = orderStaff.ID_recolector;

      if (recolectorId) {
        await OrderStaffService.releaseCollector(recolectorId);
        //await OrderStaffService.reasignarRecolector(recolectorId);
      }
      const estadoCompletado = await Order_States.findOne({
        where: { name: "Completado" },
      });
      if (!estadoCompletado)
        throw new Error("Estado 'Completado' no encontrado");

      await order.update({
        OrderStateId: estadoCompletado.id,
      });

      const repartidoresDisponibles = await Staff.findAll({
        where: {
          [Op.or]: [{ status: "Disponible" }, { status: "Esperando_entrega" }],
        },
        include: [
          {
            model: Rol,
            where: { name: "COURIER" },
          },
          {
            model: Order_Staff,
            as: "pedidosAsignados",
            required: false,
          },
        ],
      });

      const candidatos = repartidoresDisponibles
        .map((repartidor) => {
          const pedidos = repartidor.pedidosAsignados?.length || 0;
          return {
            ...repartidor.dataValues,
            pedidosAsignados: pedidos,
          };
        })
        .filter((r) => r.pedidosAsignados < 3)
        .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

      const estadoEnProceso = await Order_States.findOne({
        where: { name: "En proceso" },
      });

      if (!estadoEnProceso) {
        throw new Error("Estado 'En proceso' no encontrado.");
      }

      if (candidatos.length > 0) {
        const repartidorAsignado = candidatos[0];

        await orderStaff.update({
          ID_repartidor: repartidorAsignado.id,
          readyForDelivery: true,
        });

        await Staff.update(
          { status: "Esperando_entrega" },
          { where: { id: repartidorAsignado.id } }
        );

        await order.update({
          OrderStateId: estadoEnProceso.id,
          deliveryWaitingAt: "Asignada",
        });

        return {
          success: true,
          message: "Pedido asignado al repartidor.",
          repartidor: repartidorAsignado,
        };
      } else {
        await order.update({
          OrderStateId: estadoEnProceso.id,
          deliveryWaitingAt: "En espera",
        });
      }

      return {
        success: true,
        message:
          "Orden lista para entrega. Recolector liberado si corresponde.",
      };
    } catch (error) {
      console.error("Error al manejar la recolección completa:", error);
      throw error;
    }
  }
  static async getOrdersByDeliveryAndLocation(staffId, latitude, longitude) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Order_Staff,
            where: { ID_repartidor: staffId },
          },
          {
            model: Address,
            where: {
              latitude,
              longitude,
            },
          },
          {
            model: Order_Product,
            include: [
              { model: Order_Product_State, required: false },
              { model: Products, required: false },
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      if (!orders || orders.length === 0) {
        return {
          success: false,
          message: "No se encontraron pedidos para este repartidor en esa dirección",
        };
      }

      return {
        success: true,
        orders,
      };
    } catch (error) {
      console.error("Error en getOrdersByDeliveryAndLocation:", error);
      throw error;
    }
  }

}

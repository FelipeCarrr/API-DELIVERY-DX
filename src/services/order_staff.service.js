import { Op } from "sequelize";
import { Order } from "../models/order.model.js";
import { Order_Staff } from "../models/order_staff.model.js";
import { Rol } from "../models/rol.model.js";
import { Staff } from "../models/staff.model.js";
import { Address } from "../models/address.model.js";
import sequelize from "../utils/config-mysql.js";
import { Order_States } from "../models/order_states.model.js";
import { Administration } from "../models/administration.model.js";

sequelize.sync({ force: false }).then(() => {
  console.log("Las asociaciones y modelos están sincronizados.");
});

export class OrderStaffService {
  static async createOrderStaff(data) {
    try {
      const newOrderStaff = await Order_Staff.create(data);
      return newOrderStaff;
    } catch (error) {
      console.error("Error al crear Order_Staff:", error);
      throw error;
    }
  }

  static async getAllOrderStaff() {
    try {
      const allOrderStaff = await Order_Staff.findAll();
      return allOrderStaff;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getOrderStaffById(id) {
    try {
      const orderStaff = await Order_Staff.findOne({
        where: {
          OrderId: id,
        },
      });
      if (!orderStaff) {
        throw new Error("Order_Staff no encontrado.");
      }
      return orderStaff;
    } catch (error) {
      console.error("Error al obtener Order_Staff:", error);
      throw error;
    }
  }

  static async updateOrderStaff(id, data) {
    try {
      const orderStaff = await Order_Staff.findOne({
        where: { OrderId: id },
      });
      if (!orderStaff) {
        throw new Error("Order_Staff no encontrado.");
      }
      const updatedOrder_Staff = await orderStaff.update({
        ID_recolector: data.ID_recolector,
        ID_repartidor: data.ID_repartidor,
      });

      return updatedOrder_Staff;
    } catch (error) {
      console.error("Error al actualizar Order_Staff:", error);
      throw error;
    }
  }

  static async deleteOrderStaff(id) {
    try {
      const orderStaff = await Order_Staff.findOne({
        where: { id },
      });
      if (!orderStaff) {
        throw new Error("Order_Staff no encontrado.");
      }
      await orderStaff.destroy();
      return { message: "Order_Staff eliminado con éxito." };
    } catch (error) {
      console.error("Error al eliminar Order_Staff:", error);
      throw error;
    }
  }

  static async getOrdersByCollector(id) {
    try {
      const collectors = await Staff.findAll({
        where: { id },
      });

      if (collectors.length === 0) {
        throw new Error("No hay recolectores con el rol especificado.");
      }

      const collectorIds = collectors.map((collector) => collector.id);

      const orders = await Order_Staff.findAll({
        where: { ID_recolector: collectorIds },
      });

      return orders;
    } catch (error) {
      console.error(
        "Error al obtener las órdenes por rol de recolector:",
        error
      );
      throw new Error(
        "Error al obtener las órdenes para el rol de recolector especificado."
      );
    }
  }

  static async markOrderReadyForDelivery(orderId) {
    try {
      const orderStaff = await Order_Staff.findOne({
        where: { OrderId: orderId },
      });

      if (!orderStaff) {
        throw new Error("Order_Staff no encontrado.");
      }

      orderStaff.readyForDelivery = true;
      await orderStaff.save();

      return orderStaff;
    } catch (error) {
      console.error("Error al marcar orden como lista para entregar:", error);
      throw error;
    }
  }

  static async assignDeliveryToOrder({ orderId, deliveryId }) {
    try {
      const orderStaff = await Order_Staff.findOne({
        where: { OrderId: orderId },
      });

      if (!orderStaff) {
        throw new Error("Order_Staff no encontrado.");
      }

      orderStaff.ID_repartidor = deliveryId;
      await orderStaff.save();

      return orderStaff;
    } catch (error) {
      console.error("Error al asignar entrega a la orden:", error);
      throw error;
    }
  }

  static async autoAssignDelivery(orderId) {
    try {
      const courierRole = await Rol.findOne({ where: { name: "COURIER" } });

      if (!courierRole) {
        throw new Error("Rol COURIER no encontrado");
      }

      const deliveryStaff = await Staff.findAll({
        where: {
          RolId: courierRole.id,
          [Op.or]: [{ status: "Disponible" }, { status: "Esperando_entrega" }],
        },
        include: [
          {
            model: Order_Staff,
            as: "pedidosAsignados",
            required: false,
          },
        ],
      });

      const candidatos = deliveryStaff
        .map((repartidor) => {
          const pedidos = repartidor.pedidosAsignados?.length || 0;
          return {
            ...repartidor.dataValues,
            pedidosAsignados: pedidos,
          };
        })
        .filter((r) => r.pedidosAsignados < 3)
        .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

      if (candidatos.length === 0) {
        throw new Error("No hay repartidores disponibles");
      }

      const asignado = candidatos[0];

      await OrderStaffService.assignDeliveryToOrder({
        orderId,
        deliveryId: asignado.id,
      });

      await Staff.update(
        { status: "Esperando_entrega" },
        { where: { id: asignado.id } }
      );

      return {
        message: `Repartidor ${asignado.name} asignado automáticamente`,
      };
    } catch (error) {
      console.error("Error en autoAssignDelivery:", error);
      throw error;
    }
  }

  static async assignCollectorToOrder(orderId, transaction = null) {
    try {
      const enProcesoState = await Order_States.findOne({
        where: { name: "En proceso" },
        transaction,
      });

      const recolectores = await Staff.findAll({
        where: {
          status: {
            [Op.in]: ["Disponible", "Recolectando"],
          },
        },
        include: [
          {
            model: Rol,
            where: { name: "PACKER" },
          },
          {
            model: Order_Staff,
            as: "recolectasAsignadas",
            required: false,
            include: {
              model: Order,
              where: {
                OrderStateId: enProcesoState.id,
              },
              required: false,
            },
          },
        ],
        transaction,
      });

      const candidatos = recolectores
        .map((recolector) => {
          const recolectas = recolector.recolectasAsignadas?.length || 0;
          return {
            ...recolector.dataValues,
            recolectasAsignadas: recolectas,
          };
        })
        .filter((r) => r.recolectasAsignadas < 3)
        .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

      if (candidatos.length > 0) {
        const recolectorAsignado = candidatos[0];

        await Order_Staff.update(
          { ID_recolector: recolectorAsignado.id },
          { where: { OrderId: orderId }, transaction }
        );

        await Staff.update(
          { status: "Recolectando" },
          { where: { id: recolectorAsignado.id }, transaction }
        );

        return {
          success: true,
          message: "Recolector asignado al pedido.",
          recolector: recolectorAsignado,
        };
      } else {
        return {
          success: true,
          message:
            "Pedido creado sin asignar recolector por falta de disponibilidad.",
          recolector: null,
        };
      }
    } catch (error) {
      console.error("Error al asignar recolector:", error);
      throw error;
    }
  }

  static async reasignarRecolector(ID_staff) {
    const estadoEnProceso = await Order_States.findOne({
      where: { name: "En Proceso" },
    });
    if (!estadoEnProceso) throw new Error("Estado 'En Proceso' no encontrado");

    const pedidosPendientes = await Order_Staff.findAll({
      where: { ID_recolector: null },
      include: [
        {
          model: Order,
          where: {
            OrderStateId: estadoEnProceso.id,
          },
        },
      ],
      order: [["createdAt", "ASC"]],
      limit: 3,
    });

    if (pedidosPendientes.length === 0) {
      return { message: "No hay pedidos pendientes sin recolector asignado." };
    }

    for (const pedido of pedidosPendientes) {
      pedido.ID_recolector = ID_staff;
      await pedido.save();
    }

    const staff = await Staff.findByPk(ID_staff);
    if (staff) {
      staff.status = "Recolectando";
      await staff.save();
    }

    return {
      message: `Se asignaron ${pedidosPendientes.length} pedidos al recolector`,
      pedidos: pedidosPendientes,
    };
  }


  static async reasignarDelivery(ID_staff) {
    const estadoCompletado = await Order_States.findOne({
      where: { name: "Completado" },
    });
    if (!estadoCompletado) throw new Error("Estado 'Completado' no encontrado");

    const pedidosPendientes = await Order_Staff.findAll({
      where: { ID_repartidor: null, readyForDelivery: true },
      include: [
        {
          model: Order,
          where: {
            OrderStateId: estadoCompletado.id,
          },
        },
      ],
      order: [["createdAt", "ASC"]],
      limit: 3,
    });

    if (pedidosPendientes.length === 0) {
      return { message: "No hay pedidos listos para entrega sin repartidor asignado." };
    }

    for (const pedido of pedidosPendientes) {
      pedido.ID_repartidor = ID_staff;
      await pedido.save();
    }

    const staff = await Staff.findByPk(ID_staff);
    if (staff) {
      staff.status = "Esperando_entrega";
      await staff.save();
    }

    return {
      message: `Se asignaron ${pedidosPendientes.length} pedidos al repartidor`,
      pedidos: pedidosPendientes,
    };
  }


  static async updateStatus(staffId, status) {
    const staff = await Staff.findByPk(staffId);
    if (!staff) return null;

    staff.status = status;
    staff.updatedAt = new Date();
    await staff.save();

    await this.reasignarRecolector(staff.id);
    await this.reasignarDelivery(staff.id);

    return {
      id: staff.id,
      status: staff.status,
      updatedAt: staff.updatedAt,
    };
  }

  static async getStatus(staffId) {
    const staff = await Staff.findByPk(staffId);
    if (!staff) return null;

    return {
      id: staff.id,
      status: staff.status,
      updatedAt: staff.updatedAt,
    };
  }

  static async getDeliveryInformation(orderId) {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Order_Staff,
          include: [
            {
              model: Staff,
              as: "repartidor",
              attributes: ["id", "name", "lastName"],
            },
          ],
        },
      ],
    });

    if (!order) {
      return { error: "Orden no encontrada", status: 404 };
    }

    const estado = order.deliveryWaitingAt;

    if (!["En espera", "Asignada"].includes(estado)) {
      return {
        error: `La orden no está en un estado válido para entrega. Estado actual: ${estado}`,
        status: 400,
      };
    }

    if (estado === "En espera") {
      const admin = await Administration.findOne({
        attributes: ["id", "name"],
      });

      if (!admin) {
        return {
          error: "No se encontró información de la administración.",
          status: 404,
        };
      }

      return {
        success: true,
        destination: {
          id: admin.id,
          name: admin.name,
        },
      };
    }

    if (estado === "Asignada") {
      const ordenConRepartidor = order.Order_Staffs?.find(
        (os) => os.repartidor
      );

      if (!ordenConRepartidor || !ordenConRepartidor.repartidor) {
        return {
          error: "No hay repartidor asignado a esta orden.",
          status: 400,
        };
      }

      return {
        success: true,
        destination: {
          id: ordenConRepartidor.repartidor.id,
          name: ordenConRepartidor.repartidor.name,
          lastName: ordenConRepartidor.repartidor.lastName,
        },
      };
    }
  }

  static async releaseCollector(orderId) {
    try {
      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: Order_Staff,
            as: "orderStaffs",
            include: [{ model: Staff, as: "recolector" }],
          },
        ],
      });

      if (!order) {
        return { success: false, message: "Orden no encontrada." };
      }

      const orderStaffInstance = order.orderStaffs?.[0];

      if (!orderStaffInstance) {
        return {
          success: false,
          message: "Orden no tiene relación con order_staff.",
        };
      }

      const recolector = orderStaffInstance.recolector;

      if (!orderStaffInstance.ID_recolector || !recolector) {
        return {
          success: false,
          message: "Recolector no asignado a esta orden.",
        };
      }

      if (order.deliveryWaitingAt === "Entregado") {
        return {
          success: false,
          message: "La orden ya está marcada como entregada.",
        };
      }

      order.deliveryWaitingAt = "Entregado";

      const estadoCompletado = await Order_States.findOne({
        where: { name: "Completado" },
      });

      if (!estadoCompletado) {
        return {
          success: false,
          message: "Estado 'Completado' no encontrado.",
        };
      }

      order.OrderStateId = estadoCompletado.id;
      await order.save();

      orderStaffInstance.ID_recolector = null;
      await orderStaffInstance.save();

      const estadoEnProceso = await Order_States.findOne({
        where: { name: "En proceso" },
      });

      const ordenesPendientes = await Order.findAll({
        include: {
          model: Order_Staff,
          where: { ID_recolector: recolector.id },
        },
        where: {
          OrderStateId: estadoEnProceso.id,
        },
      });

      if (ordenesPendientes.length === 0) {
        recolector.status = "Disponible";
      } else {
        recolector.status = "Recolectando";
      }

      await recolector.save();

      return {
        success: true,
        message: "Recolector liberado correctamente.",
        orden: {
          id: order.id,
          estado: "Completado",
        },
        recolector: {
          id: recolector.id,
          estado: recolector.status,
        },
      };
    } catch (error) {
      console.error("Error en releaseCollector:", error);
      return {
        success: false,
        message: "Ocurrió un error al liberar el recolector.",
        error: error.message,
      };
    }
  }

  static async getOrdersByCourierId(courierId) {
    try {
      const orders = await Order_Staff.findAll({
        where: { ID_repartidor: courierId },
        include: [
          {
            model: Order,
            include: [
              {
                model: Address,
                attributes: [
                  "id",
                  "direction",
                  "longitude",
                  "latitude",
                  "verified",
                  "contactName",
                  "contactPhone",
                ],
              },
            ],
          },
        ],
      });

      return orders;
    } catch (error) {
      console.error("Error al obtener órdenes por repartidor:", error);
      throw error;
    }
  }

  static async releaseDelivery(orderId) {
    try {

      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: Order_Staff,
            as: "orderStaffs",
            include: [{ model: Staff, as: "repartidor" }],
          },
        ],
      });

      if (!order) {
        return { success: false, message: "Orden no encontrada." };
      }

      const orderStaffInstance = order.orderStaffs?.[0];

      if (!orderStaffInstance) {
        return {
          success: false,
          message: "Orden no tiene relación con order_staff.",
        };
      }

      const repartidor = orderStaffInstance.repartidor;

      if (!orderStaffInstance.ID_repartidor || !repartidor) {
        return {
          success: false,
          message: "Repartidor no asignado a esta orden.",
        };
      }

      const estadoEntregado = await Order_States.findOne({
        where: { name: "Entregado" },
      });

      if (!estadoEntregado) {
        return { success: false, message: "Estado 'Entregado' no encontrado." };
      }

      if (order.OrderStateId === estadoEntregado.id) {
        return {
          success: false,
          message: "La orden ya está marcada como entregada.",
        };
      }

      order.OrderStateId = estadoEntregado.id;
      await order.save();

      orderStaffInstance.ID_repartidor = null;
      await orderStaffInstance.save();

      const estadoCompletado = await Order_States.findOne({
        where: { name: "Completado" },
      });

      if (!estadoCompletado) {
        return {
          success: false,
          message: "Estado 'Completado' no encontrado.",
        };
      }

      const ordenesPendientes = await Order.findAll({
        include: {
          model: Order_Staff,
          where: { ID_repartidor: repartidor.id },
        },
        where: {
          OrderStateId: estadoCompletado.id,
        },
      });

      if (ordenesPendientes.length === 0) {
        repartidor.status = "Inactivo";
      } else {
        repartidor.status = "Entregando";
      }

      await repartidor.save();

      return {
        success: true,
        message: "Repartidor liberado correctamente.",
        orden: {
          id: order.id,
          estado: "Entregado",
        },
        repartidor: {
          id: repartidor.id,
          estado: repartidor.status,
        },
      };
    } catch (error) {
      console.error("Error en releaseDelivery:", error);
      return {
        success: false,
        message: "Ocurrió un error al liberar el repartidor.",
        error: error.message,
      };
    }
  }
}

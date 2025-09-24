import {
  validateOrderStaff,
  validatePartialOrderStaff,
} from "../schemas/order_staff.schema.js";
import { OrderStaffService } from "../services/order_staff.service.js";

export class OrderStaffController {
  static async createOrderStaff(req, res) {
    try {
      const validation = validateOrderStaff(req.body);
      if (!validation.success) {
        return res.status(400).json({
          message: "Datos inválidos",
          errors: validation.error.errors,
        });
      }

      const newOrderStaff = await OrderStaffService.createOrderStaff(req.body);
      return res.status(201).json(newOrderStaff);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateOrderStaff(req, res) {
    try {
      const validation = validatePartialOrderStaff(req.body);
      if (!validation.success) {
        return res.status(400).json({
          message: "Datos inválidos",
          errors: validation.error.errors,
        });
      }

      const updatedOrderStaff = await OrderStaffService.updateOrderStaff(
        req.params.id,
        validation.data
      );
      if (!updatedOrderStaff) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }

      return res.status(200).json(updatedOrderStaff);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAllOrderStaff(req, res) {
    try {
      const allOrderStaff = await OrderStaffService.getAllOrderStaff();

      if (allOrderStaff) {
        return res.status(200).json(allOrderStaff);
      } else {
        return res.status(500).json({ error: "Error getting order staff" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getOneOrderStaff(req, res) {
    try {
      const orderStaff = await OrderStaffService.getOrderStaffById(
        req.params.id
      );
      if (!orderStaff) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }
      return res.status(200).json(orderStaff);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteOrderStaff(req, res) {
    try {
      const deleted = await OrderStaffService.deleteOrderStaff(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }

      return res.status(200).json({ message: "Registro eliminado con éxito" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getOrdersByCollectorId(req, res) {
    try {
      const { id } = req.params;
      const orders = await OrderStaffService.getOrdersByCollector(id);

      if (orders.length === 0) {
        return res.status(204).json({});
      }

      return res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async markReadyForDelivery(req, res) {
    try {
      const { id } = req.params;

      const updated = await OrderStaffService.markOrderReadyForDelivery(id);

      return res.status(200).json({
        message: "Orden marcada como lista para entregar",
        data: updated,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async assignDelivery(req, res) {
    try {
      const { orderId, deliveryId } = req.body;

      if (!orderId || !deliveryId) {
        return res.status(400).json({
          message: "orderId y deliveryId son requeridos.",
        });
      }

      const result = await OrderStaffService.assignDeliveryToOrder({
        orderId,
        deliveryId,
      });

      return res.status(200).json({
        message: "Repartidor asignado exitosamente.",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async reasignarRecolector(req, res) {
    try {
      const { recolectorId } = req.body;

      if (!recolectorId) {
        return res.status(400).json({
          message: "El ID del recolector es requerido.",
        });
      }

      await OrderStaffService.reasignarRecolector(recolectorId);

      return res.status(200).json({
        message: "Recolector reasignado correctamente a un pedido pendiente.",
      });
    } catch (error) {
      console.error("Error al reasignar recolector:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log("###############################################");
      console.log("Actualizar estado de staff:", id, status);
      console.log("#############################################");

      if (!["Disponible", "Inactivo"].includes(status)) {
        return res.status(400).json({ error: "Estado inválido." });
      }

      const updated = await OrderStaffService.updateStatus(id, status);
      if (!updated)
        return res.status(404).json({ error: "Staff no encontrado." });

      return res.status(200).json(updated);
    } catch (error) {
      console.error("Error actualizando estado del staff:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  }

  static async getStatus(req, res) {
    try {
      const { id } = req.params;
      const statusInfo = await OrderStaffService.getStatus(id);

      if (!statusInfo)
        return res.status(404).json({ error: "Staff no encontrado." });

      return res.status(200).json(statusInfo);
    } catch (error) {
      console.error("Error consultando estado del staff:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  }
  static async getDeliveryInformation(req, res) {
    const { id } = req.params;

    try {
      const result = await OrderStaffService.getDeliveryInformation(id);

      if (result?.error) {
        return res.status(result.status || 400).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        destination: result.destination,
      });
    } catch (error) {
      console.error("Error al obtener información de entrega:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al consultar la orden.",
      });
    }
  }

  static async releaseCollector(req, res) {
    try {
      const { id } = req.params;

      const result = await OrderStaffService.releaseCollector(id);

      if (!result.success) {
        return res.status(400).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error al liberar recolector:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al liberar el recolector.",
      });
    }
  }

  static async getOrdersByCourierId(req, res) {
    try {
      const { id } = req.params;
      const orders = await OrderStaffService.getOrdersByCourierId(id);

      if (orders.length === 0) {
        return res.status(204).json({});
      }

      return res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async releaseDelivery(req, res) {
    try {
      const { id } = req.params;

      const result = await OrderStaffService.releaseDelivery(id);

      if (!result.success) {
        return res.status(400).json(result);
      }

      return res.json(result);
    } catch (error) {
      console.error("Error en controlador releaseDeliver:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno al liberar repartidor.",
        error: error.message,
      });
    }
  }
}

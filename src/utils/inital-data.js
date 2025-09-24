import { Order_States } from "../models/order_states.model.js";
import { Order_Product_State } from "../models/order_product_state.model.js";
import { Client } from "../models/client.model.js";
import { Products } from "../models/product.model.js";
import { Basket } from "../models/basket.model.js";
import { Level } from "../models/level.model.js";
import { Administration } from "../models/administration.model.js";
import { Op } from "sequelize";

export class initialData {
  static async createOrderData() {
    try {
      await Client.findOrCreate({
        where: {
          name: "Juan",
          lastName: "Perez",
          email: "juan@gmail.com",
          phone: "123456789",
        },
        defaults: {
          name: "Juan",
          lastName: "Perez",
          email: "juan@gmail.com",
          phone: "123456789",
        },
      });

      await Order_States.findOrCreate({
        where: {
          name: "En proceso",
        },
        defaults: {
          name: "En proceso",
        },
      });

      await Order_States.findOrCreate({
        where: {
          name: "Completado",
        },
        defaults: {
          name: "Completado",
        },
      });

      await Order_States.findOrCreate({
        where: {
          name: "Cancelado",
        },
        defaults: {
          name: "Cancelado",
        },
      });

      await Order_States.findOrCreate({
        where: {
          name: "Entregado",
        },
        defaults: {
          name: "Entregado",
        },
      });

      await Order_Product_State.findOrCreate({
        where: {
          name: "En proceso",
        },
        defaults: {
          name: "En proceso",
        },
      });

      await Order_Product_State.findOrCreate({
        where: {
          name: "Completado",
        },
        defaults: {
          name: "Completado",
        },
      });
    } catch (error) {
      console.log("Error al crear la orden:", error);
      throw error;
    }
  }
  static async createDefaultBaskets() {
    try {
      const existingBaskets = await Basket.count();
      if (existingBaskets > 0) {
        return;
      }

      const arroz = await Products.findOne({ where: { name: "Arroz" } });
      const pimenton = await Products.findOne({ where: { name: "Pimenton" } });
      const yuca = await Products.findOne({ where: { name: "Yuca" } });
      const zanahoria = await Products.findOne({
        where: { name: "Zanahoria" },
      });

      if (!arroz || !pimenton || !yuca || !zanahoria) {
        throw new Error("Faltan productos base para crear las canastas");
      }

      const nivelesDisponibles = await Level.findAll({
        where: { avalaible: { [Op.gt]: 0 } },
      });

      if (nivelesDisponibles.length < 4) {
        throw new Error(
          "No hay suficientes niveles disponibles para asignar las canastas"
        );
      }

      const nivelesAsignados = nivelesDisponibles.slice(0, 4);

      const canastas = [
        { producto: arroz, peso: 50, expiracionDias: 30 },
        { producto: pimenton, peso: 20, expiracionDias: 10 },
        { producto: yuca, peso: 30, expiracionDias: 15 },
        { producto: zanahoria, peso: 25, expiracionDias: 12 },
      ];

      for (let i = 0; i < canastas.length; i++) {
        const item = canastas[i];
        const nivel = nivelesAsignados[i];

        await Basket.create({
          LevelId: nivel.id,
          ProductId: item.producto.id,
          weight: item.peso,
          productState: "DISPONIBLE",
          expiration: new Date(
            Date.now() + item.expiracionDias * 24 * 60 * 60 * 1000
          ),
        });

        await Level.update(
          { avalaible: nivel.avalaible - 1 },
          { where: { id: nivel.id } }
        );
      }
    } catch (error) {
      throw error;
    }
  }
  static async createDefaultAdministrations() {
    try {
      const existingAdmin = await Administration.count();
      if (existingAdmin > 0) {
        return;
      }

      await Administration.create({
        name: "Administración Central",
        address: "Colombia, Norte de Santander, Ocaña,",
        latitude: "8.235056",
        longitude: "-73.3619924",
        radius: 100,
      });
    } catch (error) {
      console.error("Error al crear la administración por defecto:", error);
      throw error;
    }
  }
}

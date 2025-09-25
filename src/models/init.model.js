import { AisleService } from "../services/aisle.service.js";
import { AuthStaffService } from "../services/auth-staff.services.js";
import { RolService } from "../services/rol.services.js";
import { TypeService } from "../services/type.service.js";
import { UnitOfMeasureService } from "../services/unit_of_measure.service.js";

import { Aisle } from "./aisle.model.js";
import { Basket } from "./basket.model.js";
import { Client } from "./client.model.js";
import { Level } from "./level.model.js";
import { Order } from "./order.model.js";
import { Order_Product } from "./order_product.model.js";
import { Order_Product_Basket } from "./order_product_basket.model.js";
import { Order_Product_State } from "./order_product_state.model.js";
import { Order_States } from "./order_states.model.js";
import { Products } from "./product.model.js";
import { Products_Type } from "./product_type.model.js";
import { Rol } from "./rol.model.js";
import { Shelve } from "./shelve.model.js";
import { StaffCredential } from "./staff-credentials.models.js";
import { Staff } from "./staff.model.js";
import { Type } from "./type.model.js";
import { Order_Staff } from "./order_staff.model.js";
import { UnitOfMeasure } from "./unit_of_measure.model.js";

import { initialData } from "../utils/inital-data.js";
import { Administration } from "./administration.model.js";

export const initORM = async () => {
  // 1️⃣ Asociaciones
  Order_Staff.associate({ Order, Staff });
  Order.associate?.({ Order_Staff }); // si defines associate en el modelo de Order
  Staff.associate?.({ Order_Staff }); // opcional si Staff necesita relaciones también

  // 2️⃣ Crear tablas
  await Rol.sync({ alter: true });
  await Client.sync({ alter: true });
  await Staff.sync({ alter: true });
  await StaffCredential.sync({ alter: true });
  await Aisle.sync({ alter: true });
  await Shelve.sync({ alter: true });
  await Level.sync({ alter: true });
  await Type.sync({ alter: true });
  await UnitOfMeasure.sync({ alter: true });
  await Products.sync({ alter: true });
  await Products_Type.sync({ alter: true });
  await Basket.sync({ alter: true });
  await Order_States.sync({ alter: true });
  await Order_Product_State.sync({ alter: true });
  await Order.sync({ alter: true });
  await Order_Product.sync({ alter: true });
  await Order_Product_Basket.sync({ alter: true });
  await Order_Staff.sync({ alter: true });
  await Administration.sync({ alter: true });

  // 3️⃣ Cargar datos necesarios
  await RolService.createRols();
  await AuthStaffService.createAuthStaffDefault();
  await AisleService.createData();
  await TypeService.createTypes();
  await UnitOfMeasureService.createUnitsOfMeasure();
  await initialData.createOrderData();
  await initialData.createDefaultBaskets();
  await initialData.createDefaultAdministrations();
};

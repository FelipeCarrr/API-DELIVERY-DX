import sequelize from "../utils/config-mysql.js";
import { Model, DataTypes } from "sequelize";
import { Client } from "./client.model.js";
import { Order_States } from "./order_states.model.js";
import { Address } from "./address.model.js";

export class Order extends Model {
  static associate(models) {
    Order.hasMany(models.Order_Staff, {
      foreignKey: "OrderId",
      as: "orderStaff",
      constraints: false,
    });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    deliveryWaitingAt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

Client.hasMany(Order_States, { constraints: false });
Order.belongsTo(Client, { constraints: false });

Order_States.hasMany(Client, { constraints: false });
Order.belongsTo(Order_States, { constraints: false });

Address.hasMany(Order, { constraints: false });
Order.belongsTo(Address, { constraints: false });

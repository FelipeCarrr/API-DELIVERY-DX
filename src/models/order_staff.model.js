import sequelize from "../utils/config-mysql.js";
import { Model, DataTypes } from "sequelize";
import { Order } from "./order.model.js";
import { Staff } from "./staff.model.js";

export class Order_Staff extends Model {
  static associate(models) {
    Order_Staff.belongsTo(models.Staff, { as: 'recolector', foreignKey: 'ID_recolector', constraints: false });
    Order_Staff.belongsTo(models.Staff, { as: 'repartidor', foreignKey: 'ID_repartidor', constraints: false });

    Order_Staff.belongsTo(models.Order, { foreignKey: 'OrderId', as: 'order', constraints: false });
    models.Order.hasMany(Order_Staff, { foreignKey: 'OrderId', as: 'orderStaffs', constraints: false });
  }
}

Order_Staff.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    readyForDelivery: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "Order_Staff",
  }
);

Order.hasMany(Order_Staff, { constraints: false });
Order_Staff.belongsTo(Order, { constraints: false });

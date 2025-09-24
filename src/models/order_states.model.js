import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";

export class Order_States extends Model {}

Order_States.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      length: 64,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order_States",
  }
);

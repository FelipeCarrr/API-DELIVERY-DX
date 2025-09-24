import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";

export class Order_Product_State extends Model {}

Order_Product_State.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      length: 45,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order_Product_State",
  }
);

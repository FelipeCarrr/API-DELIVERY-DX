import sequelize from "../utils/config-mysql.js";
import { Model, DataTypes } from "sequelize";
import { Basket } from "./basket.model.js";
import { Order_Product } from "./order_product.model.js";

export class Order_Product_Basket extends Model {}

Order_Product_Basket.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isCollected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Order_Product_Basket",
  }
);

Basket.hasOne(Order_Product_Basket, { constraints: false });
Order_Product_Basket.belongsTo(Basket, { constraints: false });

Order_Product.hasOne(Order_Product_Basket, { constraints: false });
Order_Product_Basket.belongsTo(Order_Product, { constraints: false });

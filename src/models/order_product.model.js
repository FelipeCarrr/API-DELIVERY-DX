import sequelize from "../utils/config-mysql.js";
import { Model, DataTypes } from "sequelize";
import { Products } from "./product.model.js";
import { Order } from "./order.model.js";
import { Order_Product_State } from "./order_product_state.model.js";

export class Order_Product extends Model {}

Order_Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    weight: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize,
    modelName: "Order_Product",
  }
);

Products.hasMany(Order_Product, { constraints: false });
Order_Product.belongsTo(Products, { constraints: false });

Order.hasMany(Order_Product, { constraints: false });
Order_Product.belongsTo(Order, { constraints: false });

Order_Product_State.hasMany(Order_Product, { constraints: false });
Order_Product.belongsTo(Order_Product_State, { constraints: false });

import sequelize from "../utils/config-mysql.js";
import { Model } from "sequelize";
import { Products } from "./product.model.js";
import { Type } from "./type.model.js";

export class Products_Type extends Model {}

Products_Type.init(
  {},
  {
    sequelize,
    modelName: "Products_Type",
  }
);

Products.belongsToMany(Type, { through: Products_Type });
Type.belongsToMany(Products, { through: Products_Type });

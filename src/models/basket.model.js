import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";
import { Level } from "./level.model.js";
import { Products } from "./product.model.js";

export class Basket extends Model {}

Basket.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    weight: {
      type: DataTypes.DOUBLE,
    },
    reserved: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    productState: {
      type: DataTypes.STRING,
    },
    expiration: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Basket",
  }
);

Level.hasMany(Basket, { constraints: false });
Basket.belongsTo(Level, { constraints: false });

Products.hasMany(Basket, { constraints: false });
Basket.belongsTo(Products, { constraints: false });

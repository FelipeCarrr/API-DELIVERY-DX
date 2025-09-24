import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";

export class Aisle extends Model {}

Aisle.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Aisle",
  }
);

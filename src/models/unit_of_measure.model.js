import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";

export class UnitOfMeasure extends Model {}

UnitOfMeasure.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UnitOfMeasure",
    tableName: "units_of_measure",
  }
);
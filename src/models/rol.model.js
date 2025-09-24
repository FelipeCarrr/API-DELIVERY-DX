import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";

export class Rol extends Model {}

Rol.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Rol",
  }
);

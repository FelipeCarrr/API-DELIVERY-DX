import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";

export class Administration extends Model {}

Administration.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    radius: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Administration",
  }
);

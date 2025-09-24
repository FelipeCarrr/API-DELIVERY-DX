import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/config-mysql.js";

export class Client extends Model {}

Client.init(
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
    lastName: {
      type: DataTypes.STRING,
      length: 64,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      length: 10,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Client",
  }
);

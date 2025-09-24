import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/config-mysql.js";
import { Client } from "./client.model.js";

export class Address extends Model {}

Address.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    direction: {
      type: DataTypes.STRING,
      length: 128,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    contactName: {
      type: DataTypes.STRING,
      length: 64,
      allowNull: true,
    },
    contactPhone: {
      type: DataTypes.STRING,
      length: 10,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Address",
  }
);

Client.hasMany(Address, { constraints: false });
Address.belongsTo(Client, { constraints: false });

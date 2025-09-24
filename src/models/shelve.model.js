import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";
import { Aisle } from "./aisle.model.js";

export class Shelve extends Model {}

Shelve.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Shelve",
  }
);

Aisle.hasMany(Shelve, { constraints: false });
Shelve.belongsTo(Aisle, { constraints: false });

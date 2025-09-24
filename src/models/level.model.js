import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";
import { Shelve } from "./shelve.model.js";

export class Level extends Model {}

Level.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    avalaible: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Level",
  }
);

Shelve.hasMany(Level, { constraints: false });
Level.belongsTo(Shelve, { constraints: false });

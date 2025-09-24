import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";
import { Products } from "./product.model.js";

export class Type extends Model {}

Type.init(
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
    modelName: "Type",
  }
);

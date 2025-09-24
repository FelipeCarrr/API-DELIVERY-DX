import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";

export class Products extends Model {}

Products.init(
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
    image: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Products",
  }
);

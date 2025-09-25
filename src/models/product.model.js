import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";
import { UnitOfMeasure } from "./unit_of_measure.model.js";

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

Products.belongsTo(UnitOfMeasure, {
  foreignKey: "unitOfMeasureId",
  as: "unitOfMeasure",
});

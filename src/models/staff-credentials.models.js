import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";
import { Staff } from "./staff.model.js";

export class StaffCredential extends Model {}

StaffCredential.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      length: 255,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "StaffCredential",
  }
);

Staff.hasOne(StaffCredential, { constraints: false });
StaffCredential.belongsTo(Staff, { constraints: false });

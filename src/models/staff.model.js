import sequelize from "../utils/config-mysql.js";
import { DataTypes, Model } from "sequelize";
import { Rol } from "./rol.model.js";
import { Order_Staff } from "./order_staff.model.js";

export class Staff extends Model {
  static associate(models) {
    Staff.hasMany(models.Order_Staff, { foreignKey: 'ID_repartidor', as: 'pedidosAsignados' });
    Staff.hasMany(models.Order_Staff, { foreignKey: 'ID_recolector', as: 'recolectasAsignadas' });
  }
}

Staff.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    RolId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Inactivo",
    },
    pedidos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  },
  {
    sequelize,
    modelName: "Staff",
  }
);


Rol.hasMany(Staff, { constraints: false });
Staff.belongsTo(Rol, { constraints: false });

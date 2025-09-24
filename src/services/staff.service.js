import { Staff } from "../models/staff.model.js";
import { Rol } from "../models/rol.model.js";
import { Op } from "sequelize";

export class StaffService {
  static async getStaffPackager() {
    try {
      const staffPackager = await Staff.findAll({
        include: {
          model: Rol,
          where: {
            name: "PACKER",
          },
        },
      });
      return staffPackager;
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  static async getAllStaff() {
    try {
      const staff = await Staff.findAll({
        include: {
          model: Rol,
        },
      });
      return staff;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

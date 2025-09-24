import { StaffService } from "../services/staff.service.js";

export class StaffController {
  static async getStaffPackager(req, res) {
    console.log("getStaffPackager");

    try {
      const staffPackager = await StaffService.getStaffPackager();
      res.status(200).json(staffPackager);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  static async getAllStaff(req, res) {
    try {
      const staff = await StaffService.getAllStaff();
      res.status(200).json(staff);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

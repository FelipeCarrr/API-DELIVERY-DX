import { Rol } from "../models/rol.model.js";

export class RolService {
  static async createRols() {
    const data = ["ADMIN", "COURIER", "PACKER"];

    try {
      data.map(async (rol) => {
        await Rol.findOrCreate({
          where: {
            name: rol,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getRols() {
    try {
      return await Rol.findAll();
    } catch (error) {
      throw new Error("Error while fetching rols");
    }
  }
}

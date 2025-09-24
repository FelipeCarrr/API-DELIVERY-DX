import { RolService } from "../services/rol.services.js";

export class RolController {
  static async getRols(req, res) {
    try {
      const rols = await RolService.getRols();
      res.status(200).json(rols);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

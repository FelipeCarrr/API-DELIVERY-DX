import { Staff } from "../models/staff.model.js";
import { validateAuth } from "../schemas/auth.schema.js";
import { validateStaff } from "../schemas/staff.schema.js";
import { AuthStaffService } from "../services/auth-staff.services.js";
import { createToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class authStaffController {
  static async register(req, res) {
    const result = validateStaff(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const response = await AuthStaffService.createAuthStaff(result.data);

    if (!response) {
      return res.status(409).json({
        error: {
          message: "An error has ocurred.",
        },
      });
    }
    return res.status(201).json({ id: response });
  }

  static async login(req, res) {
    const result = validateAuth(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const response = await AuthStaffService.loginStaff(result.data);

    console.log("response", response);

    if (!response) {
      return res.status(401).json({
        error: {
          message: "Invalid username or password.",
        },
      });
    }

    const token = createToken(result.data.email, response.email);

    console.log({ Staff: response, Rol: response.Rol, token: token });

    return res
      .status(200)
      .json({ Staff: response, Rol: response.Rol, token: token });
  }

  static async loginMobile(req, res) {
    
    const result = validateAuth(req.body);
  
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
  
    const response = await AuthStaffService.loginStaff(result.data);
  
    if (!response) {
      return res.status(401).json({
        error: {
          message: "Invalid username or password.",
        },
      });
    }

    console.log(response);
    
  
    if (response.Rol.name !== "PACKER" && response.Rol.name !== "COURIER") {
      return res.status(401).json({
        error: {
          message: "Access denied. Only PACKER and COURIER can log in.",
        },
      });
    }
  
    const token = createToken(result.data.email, response.email);
  
    return res.status(200).json({ Staff: response, Rol: response.Rol, token: token });
  }
  

  static async verifyToken(req, res) {
    let token;
    try {
      token = req.header("auth-token");
    } catch (error) {
      console.log(error);
    }

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }

    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);

      const staff = await Staff.findByPk(verified.id);

      if (!staff) {
        return res.status(401).json({ error: "Token inválido o expirado." });
      }

      return res.status(200).json({ message: "Token valido" });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Token inválido o expirado." });
    }
  }
}

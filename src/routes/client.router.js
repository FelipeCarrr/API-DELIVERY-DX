import { Router } from "express";
import { clientController } from "../controllers/client.controller.js";

const clientRouter = Router();

clientRouter.post("/createClient", clientController.createClient);
clientRouter.put("/updateClient/:id", clientController.updateClient);
clientRouter.get("/getAll", clientController.getAllClients);
clientRouter.get("/getOneClient/:id", clientController.getOneClient);
clientRouter.delete("/deleteClient/:id", clientController.deleteClient);

export default clientRouter;
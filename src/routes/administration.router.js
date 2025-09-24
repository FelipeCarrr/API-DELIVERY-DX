import { Router } from "express";
import { AdministrationController } from "../controllers/administration.controller.js";

const administrationRouter = Router();

administrationRouter.post(
  "/create",
  AdministrationController.createAdministration
);
administrationRouter.get(
  "/getOne/:id",
  AdministrationController.getOneAdministration
);
administrationRouter.get(
  "/getAll",
  AdministrationController.getAllAdministrations
);
administrationRouter.delete(
  "/delete/:id",
  AdministrationController.deleteAdministration
);
administrationRouter.put(
  "/update/:id",
  AdministrationController.updateAdministration
);
administrationRouter.get(
  "/getDataCreated",
  AdministrationController.getDataAdministrationCreated
);

export default administrationRouter;

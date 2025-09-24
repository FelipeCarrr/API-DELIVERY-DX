import { Router } from "express";
import { AddressController } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/", AddressController.createAddress);
addressRouter.get("/:id", AddressController.getAddressById);
addressRouter.get("/client/:clientId", AddressController.getAddressByClientId);
addressRouter.put("/", AddressController.updateAddress);
addressRouter.delete("/:id", AddressController.deleteAddress);
addressRouter.get("/", AddressController.getAllAddresses);
addressRouter.put("/verify/:id", AddressController.verifyAddress);
addressRouter.get(
  "/getAddressByOrder/:id",
  AddressController.getAddressByOrder
);
addressRouter.get(
  "/distinctAddresses/:id",
  AddressController.getDistinctAddresses
);

export default addressRouter;

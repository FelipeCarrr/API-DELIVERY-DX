import express from "express";
import dotenv from "dotenv";
import corsMiddleware from "./src/middlewares/cors-middleware.js";

import { initORM } from "./src/models/init.model.js";
import { verifyToken } from "./src/middlewares/jwt-middleware.js";
import compression from "compression";
import authStaffRouter from "./src/routes/auth-staff.router.js";
import aisleRouter from "./src/routes/aisle.router.js";
import shelveRouter from "./src/routes/shelve.router.js";
import levelRouter from "./src/routes/level.router.js";
import typeRouter from "./src/routes/type.router.js";
import productRouter from "./src/routes/product.router.js";
import basketRouter from "./src/routes/basket.router.js";

import orderProductStateRouter from "./src/routes/order_product_state.router.js";

import orderStatesRouter from "./src/routes/order_states.router.js";
import clientRouter from "./src/routes/client.router.js";
import orderRouter from "./src/routes/order.router.js";
import orderProductRouter from "./src/routes/order_product.router.js";
import rolRouter from "./src/routes/rol.router.js";
import staffRouter from "./src/routes/staff.router.js";
import orderStaffRouter from "./src/routes/order_staff.router.js";
import orderProductBasketRouter from "./src/routes/order_product_basket.router.js";
import addressRouter from "./src/routes/address.router.js";
import administrationRouter from "./src/routes/administration.router.js";

const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT ?? 3000;

initORM();

app.use(compression());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(corsMiddleware());

app.use("/authStaff", authStaffRouter);
app.use("/aisle", verifyToken, aisleRouter);
app.use("/shelve", verifyToken, shelveRouter);
app.use("/level", verifyToken, levelRouter);
app.use("/type", verifyToken, typeRouter);

app.use("/product", verifyToken, productRouter);
app.use("/basket", verifyToken, basketRouter);

app.use("/order_product_state", verifyToken, orderProductStateRouter);
app.use("/order", orderRouter);
app.use("/order_states", verifyToken, orderStatesRouter);
app.use("/client", verifyToken, clientRouter);
app.use("/order_product", verifyToken, orderProductRouter);
app.use("/rol", verifyToken, rolRouter);
app.use("/staff", verifyToken, staffRouter);
app.use("/order_staff", orderStaffRouter);
app.use("/order_product_basket", orderProductBasketRouter);
app.use("/address", verifyToken, addressRouter);
app.use("/administration", verifyToken, administrationRouter);

app.listen(PORT, () => {
  console.log(`servidor iniciado en el puerto: ${PORT}`);
});

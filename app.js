const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  rootGet,
  getAllServices,
  getService,
  postCheckout,
  getAllOrders,
  deleteOneOrder,
  getAllOrdersForAdmin,
  adminApprove,
  generateJWT,
} = require("./Controllers/controllers");
const { connectionCheck } = require("./DB/db");
const app = express();

//middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//mongodb connection check function
connectionCheck();

//all get methods
app.get("/", rootGet);
app.get("/services", getAllServices);
app.get("/services/:id", getService);
app.get("/cart/orders/", getAllOrders);
app.get("/cart/orders/admin/rakibul572157", getAllOrdersForAdmin);

//all post methods
app.post("/checkouts", postCheckout);
app.post("/jwt/token", generateJWT);

//put or patch methods
app.patch("/admin/order/approve", adminApprove);

//delete methods
app.delete("/cart/orders/:id", deleteOneOrder);

module.exports = app;

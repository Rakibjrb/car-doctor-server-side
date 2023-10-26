const express = require("express");
const cors = require("cors");
const {
  rootGet,
  getAllServices,
  getService,
  postCheckout,
  getAllOrders,
  deleteOneOrder,
  getAllOrdersForAdmin,
  adminApprove,
} = require("./Controllers/controllers");
const { connectionCheck } = require("./DB/db");
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

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
app.patch("/admin/order/approve", adminApprove);

//put or patch methods

//delete methods
app.delete("/cart/orders/:id", deleteOneOrder);

module.exports = app;

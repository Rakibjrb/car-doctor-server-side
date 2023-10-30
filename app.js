const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
  clearCookie,
} = require("./Controllers/controllers");
const { connectionCheck } = require("./DB/db");
const sendResponse = require("./responseSend");
const app = express();

//middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return sendResponse(res, {}, 403, "Forbidden");
  jwt.verify(token, process.env.JWT_SECRETE, (err, decoded) => {
    if (err) return sendResponse(res, {}, 401, "unauthorized");
    req.user = decoded;
    next();
  });
};

//mongodb connection check function
connectionCheck();

//all get methods
app.get("/", rootGet);
app.get("/services", getAllServices);
app.get("/services/:id", getService);
app.get("/cart/orders/", verifyToken, getAllOrders);
app.get("/cart/orders/admin/rakibul572157", verifyToken, getAllOrdersForAdmin);

//all post methods
app.post("/checkouts", verifyToken, postCheckout);
app.post("/jwt/token", generateJWT);
app.post("/jwt/token/clear", clearCookie);

//put or patch methods
app.patch("/admin/order/approve", verifyToken, adminApprove);

//delete methods
app.delete("/cart/orders/:id", verifyToken, deleteOneOrder);

module.exports = app;

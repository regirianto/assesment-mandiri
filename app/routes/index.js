const express = require("express");
const router = express.Router();
const userRoute = require("./user.routes");

const appRoutes = (app) => {
  app.use("/user", userRoute);
};

module.exports = router;

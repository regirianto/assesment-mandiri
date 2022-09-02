const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const userRoute = require("./app/routes/user.routes");
const blogRoute = require("./app/routes/blog.routes");
const authRoute = require("./app/routes/auth.routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const run = () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, "public")));
  app.use("/post", blogRoute);
  app.use("/auth", authRoute);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

module.exports = run;

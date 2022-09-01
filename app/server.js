const express = require("express");
const app = express();
const port = 3000;
const userRoute = require("./routes/user.routes");
const blogRoute = require("./routes/blog.routes");
const authRoute = require("./routes/auth.routes");

const run = () => {
  app.use(express.json());
  app.use("/user", userRoute);
  app.use("/post", blogRoute);
  app.use("/auth", authRoute);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

module.exports = run;

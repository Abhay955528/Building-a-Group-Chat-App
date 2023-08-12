const express = require("express");
const app = express();

const sequelize = require("./util/database");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");

// Routes
const SignupRoutes = require("./routes/Signup");
const loginRoutes = require("./routes/login");

app.use(bodyParser.json());
app.use(cors());
app.use(compression());

app.use("/user", SignupRoutes);
app.use("/user", loginRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
  });

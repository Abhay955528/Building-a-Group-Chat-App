const express = require("express");
const app = express();

const sequelize = require("./util/database");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");

// Routes
const SignupRoutes = require("./routes/Signup");

app.use(bodyParser.json());
app.use(cors());
app.use(compression());

app.use("/user", SignupRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
  });

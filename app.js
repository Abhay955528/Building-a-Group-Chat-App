const express = require("express");
const app = express();

const sequelize = require("./util/database");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");

// Routes
const UserRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const chatRoutes = require("./routes/chat");
const groupRoutes = require("./routes/group");
const forget = require("./routes/forget");

// Module
const User = require("./model/user");
const Massage = require("./model/massage");
const Group = require("./model/group");
const groupUser = require("./model/groupuser");
const Forget = require("./model/forget");

app.use(bodyParser.json());
app.use(cors());
app.use(compression());

app.use("/user", UserRoutes);
app.use("/user", loginRoutes);
app.use("/user", chatRoutes);
app.use(groupRoutes);
app.use("/user", forget);

User.hasMany(Massage);
Massage.belongsTo(User);

Group.hasMany(Massage);
Group.hasMany(groupUser);
User.hasMany(groupUser);

User.hasMany(Forget);
Forget.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
  });

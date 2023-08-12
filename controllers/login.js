const Signup = require("../model/Signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginData = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await Signup.findAll({ where: { email } });
    if (user.length > 0) {
      console.log("USERID>>>", user[0].id);
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (err) {
          throw new Error("Something went worng");
        } else if (result === true) {
          res
            .status(201)
            .json({ message: "Successfuly signed up", success: true });
        } else {
          res
            .status(400)
            .json({ message: "Password incorrect", success: false });
        }
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User Doesnot exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginData,
};

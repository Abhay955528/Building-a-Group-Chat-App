const Signup = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(id, name) {
  return jwt.sign({ userId: id, name: name }, process.env.SECRET_KEY);
}

const loginData = async (req, res) => {
  try {
    console.log(req.url);
    const { email, pass } = req.body;
    console.log(email, pass);
    console.log(user);
    const user = await Signup.findAll({ where: { email } });
    if (user.length > 0) {
      console.log("USERID>>>", user[0].id);
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        // if (err) {
        //   throw new Error("Something went worng");
        // } 
        if (result === true) {
          console.log(res.message55);
          res.status(201).json({
            message: "Successfuly signed up",
            success: true,
            token: generateAccessToken(user[0].id, user[0].name),
          });
        } else {
          res
            .status(401)
            .json({ message: "Password incorrect", success: false });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User Doesnot exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginData,
};

const Signup = require("../model/Signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(id,name) {
    return jwt.sign({ userId: id, name: name}, "secretKey");
}

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
            .json({
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

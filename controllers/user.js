const bcrypt = require("bcrypt");
const User = require("../model/user");

const SignupUser = async (req, res) => {
  try {
    const { name, email, pass, number } = req.body;
    let solt = 10;
    bcrypt.hash(pass, solt, async (error, hash) => {
      const uId = await User.create({
        name,
        email,
        pass: hash,
        number,
      });
    });

    res.status(201).json({ message: "Successfully create new user" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  SignupUser,
};

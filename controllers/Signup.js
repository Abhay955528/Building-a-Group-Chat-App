const bcrypt = require("bcrypt");
const User = require("../model/Signup");

const Signup = async (req, res) => {
  try {
    const { Name, Email, Pass, Mobile } = req.body;
    const name = Name;
    const email = Email;
    const pass = Pass;
    const number = Mobile;
    let solt = 10;
    bcrypt.hash(Pass, solt, async (error, hash) => {
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
  Signup,
};

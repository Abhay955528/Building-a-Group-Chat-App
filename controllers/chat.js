const User = require("../model/Signup");
const Massage = require("../model/massage");

const addmassage = async (req, res) => {
  try {
    const { massage } = req.body;
    console.log(massage);
    const Result = await Massage.create({
      massage: massage,
      SignupId: req.user.id,
    });
    res.status(200).json({NewMassage:Result });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// get Massage in database
const getmassage = async (req, res) => {
  try {
    const uId = Massage.findAll({ where: { SignupId: req.user.id } });
    console.log(uId);
    res.status(201).json({allMassage:uId})
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addmassage,
  getmassage
};

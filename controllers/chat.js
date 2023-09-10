const User = require("../model/user");
const Massage = require("../model/massage");

const addmassage = async (req, res) => {
  try {
    const { massage } = req.body;
    console.log(req.user.id);
    const Result = await Massage.create({
      massage: massage,
      userId: req.user.id,
    });
    res.status(200).json({ NewMassage: Result, user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getmassage = async (req, res) => {
  try {
    const uId = await Massage.findAll({
      attributes: ["massage", "userId"],
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(201).json({ allMassage: uId });
  } catch (error) {
    console.log(error);
  }
};

const allUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addmassage,
  getmassage,
  allUser,
};

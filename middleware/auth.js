const jwt = require("jsonwebtoken");
const Signup = require("../model/Signup");

const authenticate = (req, res,next) => {
  try {
    const token = req.header("Authorization");
    console.log('TOKEN>>>>',token);
    const user = jwt.verify(token, "secretKey");
    console.log(user.userId);
    Signup.findByPk(user.userId).then((user) => {
      //! very impotent line

      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ successs: false });
  }
};

module.exports = {
  authenticate,
};

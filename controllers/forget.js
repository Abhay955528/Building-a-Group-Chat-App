const nodemailer = require("nodemailer");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const Forget = require("../model/forget");
const User = require("../model/user");

require("dotenv").config();

const forgetpassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const forgetpasswordcreate = await Forget.create({
        id: uuid.v4(),
        isActive: true,
        userId: user.id,
      });
// console.log(forgetpasswordcreate.id);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          user: "av6274962@gmail.com",
          pass: "nlswohbrzwattxoe",
        },
      });

      const response = await transporter.sendMail({
        from: "av6274962@gmail.com",
        to: email,
        subject: "Hello ✔",
        text: "and esay to do anywhere, even with Node.js",
        html: `<a href= "http://localhost:4000/user/password/resetpassword/${forgetpasswordcreate.id}">Reset password<a/>`,
      });

      await transporter.sendMail(response);
      res.status(202).json({
        message: "Link to reset password sent to your mail",
        sucess: true,
      });
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (error) {
    console.log(error);
  }
};

const resetpassword = async (req, res) => {
  try {
    const forgetpasswordId = req.params.id;
    console.log(forgetpasswordId);
    const forgetpassword = await Forget.findByPk(forgetpasswordId);
    if (forgetpassword) {
      await forgetpassword.update({ isActive: false });
      res.status(202).send(`<html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    console.log('called')
                }
            </script>
            <form action="/user/password/updatepassword/${forgetpasswordId}" method="get">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <button>reset password</button>
            </form>
          </html>`);
          res.end();
    }else{
        throw new Error("User doesnt exist");
    }
  } catch (error) {
    console.log(error);
  }
};

const updatepassword = async(req, res) => {
    try{
        const id = req.params.id;
    const newpassword = req.query.newpassword;
    console.log(newpassword);
    const details = await Forget.findByPk(id);
    const user = await User.findByPk(details.userId);
    if (user) {
      const soltRoute = 10;
      bcrypt.hash(newpassword, soltRoute, async (error, hash) => {
        if(error) {
          console.log(error);
        }
        console.log(hash);
        const passwordUpdate = await user.update({pass:hash});
        res.status(201).json({massge:'password updated successfully'});
      });
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ error, sucess: false });
  }
};

module.exports = {
  forgetpassword,
    resetpassword,
    updatepassword,
};

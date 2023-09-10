const express = require("express");
const router = express.Router();
const resetpasswordController = require("../controllers/forget");

router.post("/password/forgetpassword", resetpasswordController.forgetpassword);
router.get("/password/resetpassword/:id", resetpasswordController.resetpassword);
router.get(
  "/password/updatepassword/:id",
  resetpasswordController.updatepassword
);

module.exports = router;

const express = require("express");

const router = express.Router();
const authentication = require("../middleware/auth");
const groupControllers = require("../controllers/group");

router.post("/group/create",authentication.authenticate,groupControllers.CreateNewGroup);

router.get("/group/all", authentication.authenticate, groupControllers.getAllGroup);

router.get("/group-chat/:groupid",authentication.authenticate,groupControllers.groupChats);

router.post("/group/adduser/:username",authentication.authenticate,groupControllers.addUserToGroup);

router.post("/group/adminuser/:username",authentication.authenticate,groupControllers.addAdminToGroup);

router.post("/group/sendchat",authentication.authenticate,groupControllers.sendChatToGroup);

module.exports = router;


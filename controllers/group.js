const Group = require("../model/group");
const User = require("../model/user");
const GroupUser = require("../model/groupuser");
const Message = require("../model/massage");

const CreateNewGroup = async (req, res) => {
  const name = req.body.group;
  try {
    const newGroup = await Group.create({ group: name });
    const groupUser = await GroupUser.create({
      groupId: newGroup.id,
      userId: req.user.id,
      isAdmin: 1,
    });
    res.status(200).json({ newGroup });
  } catch (err) {
    console.log(err);
  }
};

const getAllGroup = async (req, res) => {

  try {
    const groupList = await GroupUser.findAll({
      where: { userId: req.user.id },
    });
    let allGroups = [];
    let groupsWithAdmin = [];
    for (let grp of groupList) {
      let groupFromDb = await Group.findOne({
        where: {
          id: grp.groupId,
        },
      });
      if (grp.isAdmin === true) {
        groupsWithAdmin.push(groupFromDb);
      }
      allGroups.push(groupFromDb);
    }
    // console.log("output>>>>>>>>>>>>>>>",allGroups);
    res.status(200).json({ allGroups, groupsWithAdmin });
  } catch (err) {
    console.log(err);
  }
};

const groupChats = async (req, res) => {
  try {
    // console.log(req.user.id,'>>>>>>>>');
    // console.log(req.params.groupid);
    const groupChatsFromDb = await Message.findAll({
      where: {
        groupId: req.params.groupid,
      },
    });
    console.log(groupChatsFromDb);
    res.status(200).json(groupChatsFromDb);
  } catch (error) {
    res.status(404).json({ success: "false", error });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const groupName = req.body;
    const username = req.params.name;
    const findGroup = await Group.findOne({
      where: groupName,
    });
    const findUser = await User.findOne({
      where: {
        name: username,
      },
    });
    if (findGroup && findUser) {
      const userAddToGrp = await GroupUser.create({
        groupId: findGroup.id,
        userId: findUser.id,
      });
      res.status(201).json(userAddToGrp);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const addAdminToGroup = async (req, res) => {
  try {
    const groupName = req.body;
    const username = req.params.username;
    const findGroup = await Group.findOne({
      where: groupName,
    });
    const findUser = await User.findOne({
      where: {
        name: username,
      },
    });
    if (findGroup && findUser) {
      const userAdminToGrp = await GroupUser.create({
        groupId: findGroup.id,
        userId: findUser.id,
        isAdmin: 1,
      });
      res.status(201).json(userAdminToGrp);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const sendChatToGroup = async (req, res) => {
  try {
    const groupuser = await GroupUser.findOne({
      where: { userId: req.user.id },
    });
    const sendChat = await Message.create({
      massage: req.body.chat,
      userId: req.user.id,
      groupId: groupuser.groupId,
    });
    res.status(201).json(sendChat);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  CreateNewGroup,
  getAllGroup,
  groupChats,
  sendChatToGroup,
  addUserToGroup,
  addAdminToGroup,
};

const user = document.getElementById("user-massage");
const Massage = document.getElementById("massage");
const parent = document.getElementById("user");

const groups = document.getElementById("groups");
const creategroup = document.querySelector(".create");
const chat = document.getElementById("chat");
const groupchat = document.querySelector(".send");
const addOradmin = document.getElementById("addOradmin");
const selectUser = document.getElementById("select-user");
const selectGroup = document.getElementById("select-group");
const addUser = document.getElementById("add-user");
const adminUser = document.getElementById("admin-user");
const groupChatBox = document.getElementById("chat-group");
const ul = document.getElementById("newul");

let localChats = [];
let flag = 1;

user.addEventListener("submit", newMassage);
creategroup.addEventListener("click", addGroup);

async function newMassage(e) {
  try {
    e.preventDefault();
    const massage = Massage.value;
    const newMassage = {
      massage,
    };
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:4000/user/user-addmassage",
      newMassage,
      {
        headers: { Authorization: token },
      }
    );
    if (localChats.length == 5) {
      localChats.shift();
    }
    localChats.push(response.data.chat);
    localStorage.setItem("chats", JSON.stringify(localChats));

    console.log(response.data);
    saveMessageToLocal(
      response.data.user.name,
      response.data.NewMassage.massage
    );
    showOnDisplay(response.data.user.name, response.data.NewMassage.massage);
    Massage.value = "";
  } catch (error) {
    console.log(error);
  }
}

// create new Group
async function addGroup(e) {
  e.preventDefault();
  try {
    const group = document.getElementById("group").value;
    const obj = {
      group: group,
    };
    console.log(obj);
    const token = localStorage.getItem("token");
    const createGroup = await axios.post(
      "http://localhost:4000/group/create",
      obj,
      { headers: { Authorization: token } }
    );
    const li = document.createElement("li");
    li.innerHTML = `<button id=${createGroup.data.newGroup.id}> ${createGroup.data.newGroup.group} </button>`;
    groups.appendChild(li);
    //   document.getElementById(createGroup.data.newGroup.id).addEventListener('click',() => {
    //     joinGroup(createGroup.data.newGroup.id);
    // })
  } catch (err) {
    console.log(err);
  }
}

function saveMessageToLocal(name, massage) {
  localChats = JSON.parse(localStorage.getItem("messages")) || [];
  localChats.push({ name, massage });
  if (localChats.length === 5) {
    localChats.shift();
  }
  localStorage.setItem("messages", JSON.stringify(localChats));
}

function showOnDisplay(name, massage) {
  const child = document.createElement("li");
  child.appendChild(document.createTextNode(`${name} : ${massage}`));
  if (flag === 1) {
    child.style.backgroundColor = "rgb(188 188 188)";
  }
  flag = 1 - flag;

  parent.appendChild(child);
}

window.addEventListener("DOMContentLoaded", async () => {
  showAllMassageRefreshPage();
});

async function showAllMassageRefreshPage() {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:4000/user/user-getmassage",
    {
      headers: { Authorization: token },
    }
  );
  console.log(response);

  let allMassage = response.data.allMassage;

  parent.innerHTML = "";
  for (let i = 0; i < allMassage.length; i++) {
    showOnDisplay(allMassage[i].user.name, allMassage[i].massage);
  }
  // setInterval(() => showAllMassageRefreshPage(), 1000);
  localChats = JSON.parse(localStorage.getItem("chats"));
  if (localChats) {
    getChats(localChats);
  }
}
// --------------------------------------------------------------------

// add new Gorupchat

async function getGroups() {
  try {
    const token = localStorage.getItem("token");
    const allGroups = await axios.get("http://localhost:4000/group/all", {
      headers: { Authorization: token },
    });

    const getAllGroups = allGroups.data.allGroups;
    const getAdminGroups = allGroups.data.groupsWithAdmin;
    console.log("getAdminGroups: ", getAdminGroups);

    for (let grp of getAllGroups) {
      console.log("group are: ", grp);
      let li = document.createElement("li");
      li.innerHTML = `<button id=${grp.id}> ${grp.group} </button>`;
      groups.append(li);
      document.getElementById(grp.id).addEventListener("click", () => {
        groupChat(grp.id);
      });
    }

    for (let grp of getAdminGroups) {
      let opt = document.createElement("option");
      opt.value = grp.group;
      opt.innerHTML = grp.group;
      selectGroup.append(opt);
    }
  } catch (err) {
    console.log(err);
  }
}

async function groupChat(id) {
  try {
    // console.log(id);
    groupChatBox.style = "visibility: visible;";
    document.getElementById("chat-one").style = "visibility: hidden;";
    const token = localStorage.getItem("token");
    const grpChats = await axios.get(
      "http://localhost:4000/group-chat/" +id,
        { headers: { Authorization: token } }
    );

    const listItems = document.querySelectorAll("#user li");
    console.log(listItems);
    listItems.forEach((listItem) => {
      // console.log(listItem);
      listItem.parentNode.removeChild(listItem);
    });

    const chatsFromGrp = grpChats.data;

    for (let chat of chatsFromGrp) {
      let li = document.createElement("li");
      li.innerHTML = chat.message;
      ul.append(li);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getUsers() {
  try {
    const token = localStorage.getItem("token");
    const allUsers = await axios.get("http://localhost:4000/user/all-user", {
      headers: { Authorization: token },
    });
    let usersData = allUsers.data;
    console.log(usersData);
    for (let user of usersData) {
      let opt = document.createElement("option");
      opt.value = user.name;
      opt.innerHTML = user.name;
      selectUser.append(opt);
    }
  } catch (err) {
    console.log(err);
  }
}

groupChatBox.addEventListener("submit", async (e) => {
  e.preventDefault();
  let chat = document.querySelector('#chat-group input[type="text"]').value;
  const token = localStorage.getItem("token");
  const sendGrpChat = await axios.post(
    "http://localhost:4000/group/sendchat/",
    { message: chat },
    { headers: { Authorization: token } }
  );
  console.log(sendGrpChat.data);
  let li = document.createElement("li");
  li.innerHTML = sendGrpChat.data.message;
  ul.append(li);
  groupChatBox.value = "";
});

addUser.addEventListener("click", async () => {
  if (selectUser.value != "" && selectGroup.value != "") {
    const token = localStorage.getItem("token");
    const addUserToGroup = await axios.post(
      "http://localhost:4000/group/adduser/" + selectUser.value,
      { group: selectGroup.value },
      { headers: { Authorization: token } }
    );
    console.log(addUserToGroup);
  } else {
    console.log("Empty select");
  }
});

adminUser.addEventListener("click", async () => {
  try {
    if (selectUser.value != "" && selectGroup.value != "") {
      const token = localStorage.getItem("token");
      const addAdminToGroup = await axios.post(
        "http://localhost:4000/group/adminuser/" + selectUser.value,
        { group: selectGroup.value },
        { headers: { Authorization: token } }
      );
      console.log(addAdminToGroup);
    } else {
      console.log("Empty select");
    }
  } catch (error) {
    console.log("Some error: ", error);
  }
});

const getChats = async (chats) => {
  try {
    ul.innerHTML = ""; // Clear the existing chat list
    for (let chat of chats) {
      if (chat && chat.name && chat.massage) {
        let li = document.createElement("li");
        li.innerHTML = chat.name + " - " + chat.massage;
        ul.appendChild(li);
      }
    }
    getGroups();
    getUsers();
  } catch (error) {
    console.error("Error in getChats:", error);
  }
};

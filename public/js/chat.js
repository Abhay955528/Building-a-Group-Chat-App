const user = document.getElementById("user-massage");
const Massage = document.getElementById("massage");
const parent = document.getElementById("user");
let localChats = [];
let flag = 1;

user.addEventListener("submit", newMassage);

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

function saveMessageToLocal(name, massage) {
  localChats = JSON.parse(localStorage.getItem("messages")) || [];
  localChats.push({ name, massage });
  console.log(localChats);
  if (localChats.length === 5) {
    localChats.shift();
  }
  console.log(localChats);
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
  showAllMassage();
});

async function showAllMassage() {
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
    showOnDisplay(allMassage[i].Signup.name, allMassage[i].massage);
  }
  setInterval(() => showAllMassage(), 1000);
}

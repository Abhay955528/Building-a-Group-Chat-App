const user = document.getElementById("user-massage");
const Massage = document.getElementById("massage");

user.addEventListener("submit", userMassage);

async function userMassage(e) {
  try {
    e.preventDefault();
    const massage = Massage.value;
    const newMassage = {
      massage,
    };
    console.log(newMassage);
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:4000/user/user-addmassage",
      newMassage,
      {
        headers: { Authorization: token },
      }
    );
    showOnDisplay(response.data.NewMassage);
    Massage.value = "";
  } catch (error) {
    console.log(error);
  }
}

function showOnDisplay(obj, index) {
  console.log(obj.Signup.name);
  const parent = document.getElementById("user");
  const child = document.createElement("li");

  child.appendChild(
    document.createTextNode(`${obj.Signup.name} : ${obj.massage}`)
  );

  if (index % 2 === 0) {
    child.style.backgroundColor = "rgb(188 188 188)";
  }

  parent.appendChild(child);
}

window.addEventListener("DOMContentLoaded", refreshThepage);

async function refreshThepage(e) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:4000/user/user-getmassage",
      {
        headers: { Authorization: token },
      }
    );

    console.log(response);
    for (let i = 0; i < response.data.allMassage.length; i++) {
        showOnDisplay(response.data.allMassage[i], i);
    }
  } catch (error) {
    console.log(error);
  }
}

const user = document.getElementById("user-massage");
const Massage = document.getElementById("massage");

user.addEventListener("submit", allMassage);

async function allMassage(e) {
  try {
    e.preventDefault();
    const massage = Massage.value;
    const allMassage = {
      massage,
    };
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:4000/user/user-addmassage",
      allMassage,
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

function showOnDisplay(data,index) {
  try {
    const parent = document.getElementById("user");
    const child = document.createElement("li");

    child.appendChild(
      document.createTextNode(`${data.Signup.name} : ${data.massage}`)
    );

    if (index % 2 === 0) {
      child.style.backgroundColor = "rgb(188 188 188)";
      child.style.color = "white";
    }

    parent.appendChild(child);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
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
      // if (i % 2 == 0)
      //   response.data.allMassage[i].style.backgroundColor = "#365890";
      showOnDisplay(response.data.allMassage[i],i);
    }
  } catch (error) {
    console.log(error);
  }
});

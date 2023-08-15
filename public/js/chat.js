const user = document.getElementById("user-massage");
const Massage = document.getElementById("massage");

user.addEventListener("submit", newMassage);

async function newMassage(e) {
  try {
    e.preventDefault();
    let massage = Massage.value;
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
    showOnDisplay(response.data.allMassage);
    Massage.value = "";
  } catch (error) {
    console.log(error);
  }
}

function showOnDisplay(massage) {}

window.addEventListener("DOMContentLoaded", async () => {
 try {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhot:4000/user/user-getmassage",
    {
      headers: { Authorization: token },
    }
  );
  console.log(response);
  for (let i = 0; i < response.data.length.NewMassage; i++) {
    showOnDisplay(response.data[i])
  }
 } catch (error) {
  console.log(error);
 }
});

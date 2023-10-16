const form = document.getElementById("login");
const Email = document.getElementById("email");
const Pass = document.getElementById("pass");
const BASE_URL = "44.201.87.18";

form.addEventListener("submit", loginData);

async function loginData(e) {
  try {
    e.preventDefault();
    const email = Email.value;
    const pass = Pass.value;

    const loginUser = {
      email,
      pass,
    };
    console.log(loginUser);

    const response = await axios.post(
      `http://${BASE_URL}:4000/user/user-login`,
      loginUser
    );

    if (response) {
      if (response.status === 201) {
        console.log(response.data.message);
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        window.location.href = "../views/chat.html";
      }
    }

    Email.value = "";
    Pass.value = "";
  } catch (error) {
    if (error) {
      console.log(error.message);
      alert(error.message);
    }
    // console.log(error);
    // document.body.innerHTML += `<div style="color:red;">${error.message}`;
  }
}

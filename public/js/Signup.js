const form = document.getElementById("my-form");
const Name = document.getElementById("user-name");
const Email = document.getElementById("user-email");
const Pass = document.getElementById("user-pass");
const Mobile = document.getElementById("user-mobile");

form.addEventListener("submit", sendUser);

async function sendUser(e) {
  try {
    e.preventDefault();
    const name = Name.value;
    const email = Email.value;
    const pass = Pass.value;
    const number = Mobile.value;

    const user = {
      name,
      email,
      pass,
      number,
    };

    console.log(user);

    const response = await axios.post(
      "http://localhost:4000/user/user-Signup",
      user
    );

    Name.value = "";
    Email.value = "";
    Pass.value = "";
    Mobile.value = "";
    
  } catch (error) {
    console.log(error);
  }
}

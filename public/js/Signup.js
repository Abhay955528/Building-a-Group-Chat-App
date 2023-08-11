const form = document.getElementById("my-form");
const name = document.getElementById("user-name");
const email = document.getElementById("user-email");
const pass = document.getElementById("user-pass");
const mobile = document.getElementById("user-mobile");

form.addEventListener("submit", sendUser);

async function sendUser(e) {
  e.preventDefault();
  const Name = name.value;
  const Email = email.value;
  const Pass = pass.value;
  const Mobile = mobile.value;

  const user = {
    Name,
    Email,
    Pass,
    Mobile,
  };

  console.log(user);

  const response = await axios.post(
    "http://localhost:4000/user/user-Signup",
    user
  );

  // Name.value = "";
  // Email.value = "";
  // Pass.value = "";
  // Mobile.value = "";
}

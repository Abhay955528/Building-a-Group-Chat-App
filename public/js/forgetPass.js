async function forgetpassword(e) {
  try {
    e.preventDefault();
    const form = new FormData(e.target);

    const userDetails = {
      email: form.get("email"),
    };

    console.log(userDetails);
    const response = await axios.post(
      "http://44.201.87.18:4000/user/password/forgetpassword",
      userDetails
    );
    if (response.status === 202) {
      document.body.innerHTML +=
        '<div style="color:red;">Mail Successfuly sent <div>';
    } else {
      throw new Error("Something went wrong!!!");
    }
  } catch (err) {
    console.log(err);
    document.body.innerHTML += `<div style="color:red;">${err} <div>`;
  }
}

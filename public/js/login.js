document.getElementById("loginForm").addEventListener("submit", submiting);

function submiting(e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  put();
  async function put() {
    await axios
      .post(`http://3.94.179.87:4001/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        // alert("User logged successfully");
        console.log(response);
        localStorage.setItem("Token", response.data.token);
        window.location = "http://3.94.179.87:4001/user/form";
      })
      .catch((err) => {
        console.log(err);
        var message = document.getElementById("message");
        var p = document.createElement("p");
        p.textContent = "Account not Exist";
        message.appendChild(p);

        var signUpMessageInLoginPage = document.createElement("a");
        signUpMessageInLoginPage.href = "/";
        signUpMessageInLoginPage.textContent = "click here to sign up";
        message.appendChild(signUpMessageInLoginPage);
      });
  }
}

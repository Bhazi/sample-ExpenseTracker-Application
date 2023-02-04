document.getElementById("popo").addEventListener("submit", submitting);

function submitting(e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  put();
  async function put() {
    await axios
      .post(`http://localhost:4001/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        var message = document.getElementById("message");
        var p = document.createElement("p");
        p.textContent = response.data.message;
        message.appendChild(p);
      })
      .catch((err) => {
        var message = document.getElementById("message");
        var p = document.createElement("p");
        p.textContent = "Account not Exist";
        message.appendChild(p);

        var signUpMessageInLoginPage = document.createElement("a");
        signUpMessageInLoginPage.href = "/";
        signUpMessageInLoginPage.textContent = "click here to sign up";
        message.appendChild(signUpMessageInLoginPage);
        // <a href="/"><p>click here to sign up</p></a>
      });
  }
}

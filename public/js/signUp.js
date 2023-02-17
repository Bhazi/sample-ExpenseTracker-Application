document.getElementById("signUpForm").addEventListener("submit", submitting);

function submitting(e) {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  put();
  async function put() {
    await axios
      .post(`http://184.72.72.11:4001/`, {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        // alert("Account successfully created");
        window.location = "http://184.72.72.11:4001/login";
      })
      .catch((err) => {
        var parentDiv = document.getElementById("message");
        var errorMessage = document.createElement("p");

        if (err.response.status == 401)
          errorMessage.textContent = "*User already exist";
        else errorMessage.textContent = "*Inputs Invalid";

        parentDiv.appendChild(errorMessage);
      });
  }
}

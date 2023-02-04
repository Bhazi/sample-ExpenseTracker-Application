document.getElementById("loginForm").addEventListener("click", submitting);

function submitting(e) {
  // e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  put();
  async function put() {
    await axios
      .post(`http://localhost:4001/`, {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {})
      .catch((err) => {
        var parentDiv = document.getElementById("errorMessage");
        var errorMessage = document.createElement("p");
        errorMessage.textContent = "User already exist";
        parentDiv.appendChild(errorMessage);
      });
  }
}

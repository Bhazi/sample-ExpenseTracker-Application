document.getElementById("submit").addEventListener("click", submitting);

function submitting() {
  console.log(1);
  // e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  put();
  async function put() {
    axios
      .post(`http://localhost:4001/`, {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
}

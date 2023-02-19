document.getElementById("forgotForm").addEventListener("submit", submittting);
function submittting(e) {
  // e.preventDefault();
  var email = document.getElementById("email").value;
  post();
  async function post() {
    await axios
      .post(`http://3.94.179.87:4001/password/forgotPassword`, {
        email: email,
      })
      .then((response) => {
        window.location = "http://3.94.179.87:4001/login";
      })
      .catch((err) => console.log(err));
  }
}

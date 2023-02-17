document.getElementById("forgotForm").addEventListener("submit", submittting);
function submittting(e) {
  // e.preventDefault();
  var email = document.getElementById("email").value;
  post();
  async function post() {
    await axios
      .post(`http://184.72.72.11:4001/password/forgotPassword`, {
        email: email,
      })
      .then((response) => {
        window.location = "http://184.72.72.11:4001/login";
      })
      .catch((err) => console.log(err));
  }
}

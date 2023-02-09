document.getElementById("loginForm").addEventListener("submit", submiting);

function submiting(e) {
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
        // alert("User logged successfully");
        console.log(response);
        localStorage.setItem("Token", response.data.token);
        window.location = "http://localhost:4001/user/form";
        // var message = document.getElementById("message");
        // var p = document.createElement("p");
        // p.textContent = response.data.message;
        // message.appendChild(p);
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

        // function poss() {
        //   new Promise((resolve) => {});
        // }

        // f();
        // async function f() {
        //   return Promise.resolve(
        //     setTimeout(
        //       () => (window.location = "http://localhost:4001/login"),
        //       1000
        //     )
        //   );
        // }
      });
  }
}

document.getElementById("rzp-button1").addEventListener("click", async (e) => {
  const token = localStorage.getItem("Token");
  const response = await axios.get(
    "http://localhost:4001/purchase/premiummembership",
    { headers: { Authorization: token } }
  );

  console.log(response.data.order.orderId);
  var options = {
    key: response.data.key_id, //Enter the keyID generated from the Dashboard
    order_id: response.data.order.orderId, //for one time payment
    //this handler function will handle the success payment
    handler: async function (response) {
      await axios.post(
        "http://localhost:4001/purchase/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      alert("You are a premium user Now");
    },
  };

  const rzpl = new Razorpay(options);
  rzpl.open();
  e.preventDefault();

  rzpl.on("payment failed", function (response) {
    console.log(response);
    alert("Something went wrong");
  });
});

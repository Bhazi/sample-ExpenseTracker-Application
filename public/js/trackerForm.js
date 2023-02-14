document
  .getElementById("expenseTracking")
  .addEventListener("submit", submitting);

const token = localStorage.getItem("Token");

function submitting(e) {
  // e.preventDefault();
  var expense = document.getElementById("expense").value;
  var desc = document.getElementById("description").value;
  var categories = document.getElementById("categories").value;

  post();
  async function post() {
    await axios
      .post(
        `http://localhost:4001/user/form`,
        {
          expense: expense,
          description: desc,
          category: categories,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        // window.location = "http://localhost:4001/user/form";
      })
      .catch((err) => console.log(err));
  }
}

//assigning limit of page contents
let limit;
document.getElementById("rowsPerPage").addEventListener("change", (event) => {
  limit = event.target.value;
  localStorage.setItem("limit", limit);
  location.reload();
});

window.addEventListener("DOMContentLoaded", async () => {
  const page = 1;
  const limitValue = localStorage.getItem("limit");
  try {
    await axios
      .get(
        `http://localhost:4001/user/getDetails?page=${page}&limit=${limitValue}`,
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        console.log(res);
        showPagination(res.data);
        //heading for no list found !
        if (res.data.datas === null) {
          //showing PremiumUser
          premiumOrNot(res);

          var elements = document.getElementById("elements");
          var label = document.createElement("h3");
          label.textContent = "No list found !";
          elements.appendChild(label);
          document.getElementById("lists").style.display = "none";
        } else {
          //showing premiumUser
          premiumOrNot(res);
          // displaying elements
          res.data.allUsers.forEach((element) => {
            showOnUserScreen(element);
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
});

function showOnUserScreen(data) {
  var elements = document.getElementById("elements");
  var label = document.createElement("p");
  label.id = data.id;
  label.textContent = `${data.expense}\u00A0\u00A0\u00A0\u00A0-\u00A0\u00A0\u00A0\u00A0${data.description}\u00A0\u00A0\u00A0\u00A0-\u00A0\u00A0\u00A0\u00A0${data.category}`;

  var deleteButton = document.createElement("button");
  deleteButton.id = "delete";
  deleteButton.onclick = function () {
    deleting(data.id, data.expense);
  };
  deleteButton.className = "btn btn-outline-danger";
  deleteButton.appendChild(document.createTextNode("Delete"));
  label.appendChild(deleteButton);

  elements.appendChild(label);
}

function deleting(id, expense) {
  axios
    .delete(`http://localhost:4001/user/delete/${id}/${expense}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      // window.location = "http://localhost:4001/user/form";
      removeFromScreen(id);
    })
    .catch((err) => console.log(err));
}

function removeFromScreen(id) {
  var parentNode = document.getElementById("elements");
  parentNode.removeChild(document.getElementById(id));
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
      const premium = document.getElementById("premium");
      const p = document.createElement("p");
      p.textContent = "You are a premium user";
      p.id = "premium_user";
      premium.appendChild(p);
      document.getElementById("rzp-button1").style.display = "none";
    },
  };

  const rzpl = new Razorpay(options);
  rzpl.open();

  rzpl.on("payment failed", function (response) {
    console.log(response);
    alert("Something went wrong");
  });
});

function premiumOrNot(datas) {
  if (datas.data.premium.ispremiumuser == true) {
    const premium = document.getElementById("premium");
    const p = document.createElement("p");
    p.textContent = "You are a premium user";
    p.style.fontWeight = "600";
    p.id = "premium_user";
    premium.appendChild(p);
    document.getElementById("rzp-button1").style.display = "none";
    document.getElementById("downloadFile").style.display = "block";
    document.getElementById("fileDownloaded").style.display = "block";
  } else {
    document.getElementById("rzp-button1").style.display = "block";
    document.getElementById("downloadFile").style.display = "none";
    document.getElementById("fileDownloaded").style.display = "none";
  }
}

function showPagination({
  currentPage,
  hasNextPage,
  nextPage,
  hasPreviousPage,
  previousPage,
  lastPage,
}) {
  pagination.innerHTML = "";
  if (hasPreviousPage) {
    const btn1 = document.createElement("button");
    btn1.innerHTML = previousPage;
    btn1.className = "btn btn-sm btn-outline-secondary";
    btn1.style.marginRight = "7px";
    btn1.addEventListener("click", () => getProducts(previousPage));
    pagination.appendChild(btn1);
  }
  const btn2 = document.createElement("button");
  btn2.innerHTML = currentPage;
  btn2.className = "btn btn-sm btn-outline-secondary";
  btn2.style.marginRight = "7px";
  btn2.addEventListener("click", () => getProducts(currentPage));
  pagination.appendChild(btn2);

  if (hasNextPage) {
    const btn3 = document.createElement("button");
    btn3.innerHTML = nextPage;
    btn3.className = "btn btn-sm btn-outline-secondary";
    btn3.style.marginRight = "7px";
    btn3.addEventListener("click", () => getProducts(nextPage));
    pagination.appendChild(btn3);
  }
}

function getProducts(page) {
  var elements = document.getElementById("elements");
  elements.innerHTML = " ";
  const limitValue = localStorage.getItem("limit");
  axios
    .get(
      `http://localhost:4001/user/getDetails?page=${page}&limit=${limitValue}`,
      {
        headers: { Authorization: token },
      }
    )
    .then((datass) => {
      datass.data.allUsers.forEach((element) => {
        console.log(datass);
        showOnUserScreen(element);
        showPagination(datass.data);
      });
      // showOnUserScreen(products);
    })
    .catch((err) => console.log(err));
}

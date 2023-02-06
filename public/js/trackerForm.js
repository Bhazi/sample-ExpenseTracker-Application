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
// }

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await axios
      .get("http://localhost:4001/user/getDetails", {
        headers: { Authorization: token },
      })
      .then((res) => {
        //heading for no list found !
        if (res.status == 204) {
          var elements = document.getElementById("elements");
          var label = document.createElement("h3");
          label.textContent = "No list found !";
          elements.appendChild(label);
        } else {
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
    deleting(data.id);
  };
  deleteButton.className = "btn btn-outline-danger";
  deleteButton.appendChild(document.createTextNode("Delete"));
  label.appendChild(deleteButton);

  elements.appendChild(label);
}

function deleting(id) {
  axios
    .delete(`http://localhost:4001/user/delete/${id}`)
    .then((res) => {
      removeFromScreen(id);
    })
    .catch((err) => console.log(err));
}

function removeFromScreen(id) {
  var parentNode = document.getElementById("elements");
  parentNode.removeChild(document.getElementById(id));
}

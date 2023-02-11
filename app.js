const express = require("express");

const app = express();
const path = require("path");

const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

const Expense = require("./models/expenseTracker");
const Login = require("./models/signUp");
const Order = require("./models/order");

const signUpRoutes = require("./routes/signUp");
const loginRoutes = require("./routes/login");
const expenseTrackerFormRoutes = require("./routes/expenseTracker");
const purchase = require("./routes/purchase");
const premium = require("./routes/premium");

const sequelize = require("./util/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(signUpRoutes);
app.use(loginRoutes);
app.use("/user", expenseTrackerFormRoutes);
app.use("/purchase", purchase);
app.use(premium);

Login.hasMany(Expense);
Expense.belongsTo(Login);

Login.hasMany(Order);
Order.belongsTo(Login);

sequelize
  .sync()
  .then((data) => {
    app.listen(4001);
  })
  .catch((err) => console.log(err));

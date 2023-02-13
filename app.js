const express = require("express");
const app = express();

const path = require("path");
const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

//Models
const Expense = require("./models/expenseTracker");
const Login = require("./models/signUp");
const Order = require("./models/order");
const ForgotPassReq = require("./models/forgotPasswordRequest");
const FilesDownloaded = require("./models/filesDownloaded");

//Routes
const signUpRoutes = require("./routes/signUp");
const loginRoutes = require("./routes/login");
const expenseTrackerFormRoutes = require("./routes/expenseTracker");
const purchase = require("./routes/purchase");
const premium = require("./routes/premium");
const forgotPassword = require("./routes/forgot_resetPassword");
const downloadFile = require("./routes/downloadFile");

const sequelize = require("./util/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(signUpRoutes);
app.use(loginRoutes);
app.use("/user", expenseTrackerFormRoutes);
app.use("/purchase", purchase);
app.use(premium);
app.use(forgotPassword);
app.use(downloadFile);

//Associations
Login.hasMany(Expense);
Expense.belongsTo(Login);

Login.hasMany(Order);
Order.belongsTo(Login);

Login.hasMany(ForgotPassReq);
ForgotPassReq.belongsTo(Login);

Login.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(Login);

//syncing with port
sequelize
  .sync({ force: false })
  .then((data) => {
    app.listen(4001);
  })
  .catch((err) => console.log(err));

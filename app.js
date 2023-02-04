const express = require("express");

const app = express();
const path = require("path");

const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

const signUpRoutes = require("./routes/signUp");
const loginRoutes = require("./routes/login");

const sequelize = require("./util/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(signUpRoutes);
app.use(loginRoutes);

sequelize
  .sync()
  .then((data) => {
    app.listen(4001);
  })
  .catch((err) => console.log(err));
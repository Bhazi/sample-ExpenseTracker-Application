const path = require("path");

const Login = require("../models/login");

exports.getLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "loginPage.html"));
  // res.send("hello");
};

exports.postData = (req, res) => {
  Login.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
};

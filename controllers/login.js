const path = require("path");

const Login = require("../models/login");

exports.getLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "loginPage.html"));
  // res.send("hello");
};

exports.postData = async (req, res) => {
  await Login.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((response) => {
      return res.status(201).json();
    })
    .catch((err) => {
      res.status(400).json();
    });
};

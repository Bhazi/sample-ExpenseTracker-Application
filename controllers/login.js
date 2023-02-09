const path = require("path");
const Login = require("../models/signUp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getLogIn = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "views", "authentication", "loginPage.html")
  );
};

exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //checking email exist or not in database

  const emailsIsThereOrNot = await Login.findOne({ where: { email: email } });
  if (emailsIsThereOrNot == null) {
    return res.status(404).json();
  }

  //finding password belongs to the email

  var attributes = ["password", "id"];
  const passwordFromDb = await Login.findOne({
    where: { email: email },
    attributes: attributes,
  });

  var obj = JSON.stringify(passwordFromDb);
  obj = JSON.parse(obj);

  //tokenising the ID
  function tokenising(id) {
    return jwt.sign(
      { userId: id },
      '45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52'
    );
  }

  bcrypt.compare(password, obj.password, (err, result) => {
    if (result) {
      res
        .status(200)
        .json({ message: "User login sucessful", token: tokenising(obj.id) });
    } else {
      res.status(401).json();
    }
  });
};

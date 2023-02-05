const path = require("path");
const Login = require("../models/signUp");

const bcrypt = require("bcrypt");

exports.getLogIn = (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "loginPage.html"));
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

  var attributes = ["password"];
  const passwordFromDb = await Login.findOne({
    where: { email: email },
    attributes: attributes,
  });

  var obj = JSON.stringify(passwordFromDb);
  obj = JSON.parse(obj);

  bcrypt.compare(password, obj.password, (err, result) => {
    if (result) res.status(200).json({ message: "User login sucessful" });
    else res.status(401).json();
  });
};

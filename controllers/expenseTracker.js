const Expense = require("../models/expenseTracker");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getForm = async (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "views", "expenseTracker", "trackerForm.html")
  );
};

exports.getDetails = async (req, res, next) => {
  const idd = req.user;
  const user = await Expense.findAll({ where: { loginId: idd } });
  if (user == "") return res.status(204).json();
  res.status(200).json({ allUsers: user });
};

exports.postForm = async (req, res, next) => {
  //retreving User Id from Token
  const token = req.header("Authorization");
  const userId = jwt.verify(
    token,
    "45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52326"
  ).userId;

  const expense = req.body.expense;
  const desc = req.body.description;
  const category = req.body.category;

  await Expense.create({
    expense: expense,
    description: desc,
    category: category,
    loginId: userId,
  });
  return res.status(201).json();
};

exports.deleteElement = async (req, res, next) => {
  try {
    const uId = req.params.id;
    await Expense.destroy({ where: { id: uId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

// exports.editElement = async (req, res) => {
//   try {
//     const uId = req.params.id;
//     const expense = req.body.expense;
//     const desc = req.body.description;
//     const category = req.body.category;
//     await Expense.update(
//       { expense: expense, description: desc, category: category },
//       { where: { id: uId } }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

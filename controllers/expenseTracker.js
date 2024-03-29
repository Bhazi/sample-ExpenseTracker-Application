const Expense = require("../models/expenseTracker");
const Login = require("../models/signUp");
const path = require("path");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const { type } = require("os");
require("dotenv").config();

exports.getForm = async (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "views", "ExpenseTracker", "trackerForm.html")
  );
};

exports.getDetails = async (req, res, next) => {
  const idd = req.user;
  var attributes = ["ispremiumuser"];
  const isPremium = await Login.findOne({
    where: { id: req.user },
    attributes: attributes,
  });

  const page = parseInt(req.query.page);
  const ITEMS_PER_PAGE = parseInt(req.query.limit);

  var totalCount = await Expense.count({ where: { loginId: idd } });

  const user = await Expense.findAll({
    where: { loginId: idd },
    offset: (page - 1) * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
  });

  if (user == "") {
    return res.status(200).json({ premium: isPremium, datas: null });
  } else {
    res.status(200).json({
      allUsers: user,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalCount,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalCount / ITEMS_PER_PAGE),
      premium: isPremium,
    });
  }
};

exports.postForm = async (req, res, next) => {
  //retreving User Id from Token
  const token = req.header("Authorization");
  const userId = jwt.verify(
    token,
    "45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52"
  ).userId;

  const expense = req.body.expense;
  const desc = req.body.description;
  const category = req.body.category;

  var attributes = ["totalExpenses"];
  const pass = await Login.findOne({
    where: { id: userId },
    attributes: attributes,
  });

  var totalExpensesChanged = pass.dataValues.totalExpenses + parseInt(expense);

  await Login.update(
    { totalExpenses: totalExpensesChanged },
    { where: { id: userId } }
  );

  await Expense.create({
    expense: expense,
    description: desc,
    category: category,
    loginId: userId,
  });
  return res.status(201).json();
};

exports.deleteElement = async (req, res, next) => {
  const token = req.header("Authorization");
  const expense = req.params.expense;
  const userId = jwt.verify(
    token,
    "45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52"
  ).userId;

  var attributes = ["totalExpenses"];
  const pass = await Login.findOne({
    where: { id: userId },
    attributes: attributes,
  });

  var totalExpensesChanged = pass.dataValues.totalExpenses - parseInt(expense);

  await Login.update(
    { totalExpenses: totalExpensesChanged },
    { where: { id: userId } }
  );

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

const Expense = require("../models/expenseTracker");
const path = require("path");

exports.getForm = async (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "views", "expenseTracker", "trackerForm.html")
  );
};

exports.getDetails = async (req, res, next) => {
  const user = await Expense.findAll();
  console.log(user);
  if (user == "") return res.status(204).json();
  res.status(200).json({ allUsers: user });
};

exports.postForm = async (req, res, next) => {
  const expense = req.body.expense;
  const desc = req.body.description;
  const category = req.body.category;
  await Expense.create({
    expense: expense,
    description: desc,
    category: category,
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

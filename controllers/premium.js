const sequelize = require("../util/database");
const path = require("path");
const Expense = require("../models/expenseTracker");
const Login = require("../models/signUp");

exports.getLeaderboard = async (req, res, next) => {
  // const valuee = await Expense.findAll({
  //   attributes: [
  //     "loginId",
  //     [sequelize.fn("sum", sequelize.col("expense")), "total_amount"],
  //   ],
  //   group: ["loginId"],
  // });

  const value = await Expense.findAll({
    attributes: [
      "loginId",
      [sequelize.fn("SUM", sequelize.col("expense")), "totalValue"],
    ],
    include: [
      {
        model: Login,
        attributes: ["name"],
      },
    ],
    group: ["loginId"],
    order: [[sequelize.fn("SUM", sequelize.col("expense")), "DESC"]],
  });

  // const valueName = await Login.findAll({
  //   attributes:["name"],where:{id:}
  // })
  res.status(200).json({ datass: value });
};

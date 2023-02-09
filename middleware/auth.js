const jwt = require("jsonwebtoken");

const getVerifyingIdFromToken = (req, res, next) => {
  const token = req.header("Authorization");
  const userId = jwt.verify(
    token,
    "45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52"
  ).userId;
  req.user = userId;
  next();
};

module.exports = { getVerifyingIdFromToken };

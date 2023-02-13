const jwt = require("jsonwebtoken");

const getVerifyingIdFromToken = (req, res, next) => {
  const token = req.header("Authorization");
  const valuesFromToken = jwt.verify(
    token,
    "45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52"
  );

  req.user = valuesFromToken.userId;
  req.names = valuesFromToken.names;

  next();
};

module.exports = { getVerifyingIdFromToken };

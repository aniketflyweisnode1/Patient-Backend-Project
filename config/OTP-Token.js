const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const generateOTP = () => {
  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return otp.toString();
};

module.exports = {
  generateOTP,
  generateJwtToken,
};

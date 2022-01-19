//jwt generator
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (user_id) => {
  const jwtSecret = process.env.JWT_SECRET;
  const payload = { user_id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
  return token;
};

module.exports = jwtGenerator;

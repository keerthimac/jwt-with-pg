const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    //01 save the token from the request header
    const token = req.header("token");
    const user = req.user;
    console.log(user);

    //02 check if the token is valid
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: "No token provided",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //03 set user to the verified user
    req.user = verified.user_id;
    console.log(verified);

    //04 call next()
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`${error.message}. Unable to authenticate`);
  }
};

module.exports = auth;

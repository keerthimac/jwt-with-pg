const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
const validation = require("../middleware/validation");
const auth = require("../middleware/auth");

//Register Route
router.post("/register", validation, async (req, res) => {
  try {
    //01. destructure the req.body (name, email, password)
    const { name, email, password } = req.body;
    console.log(req.body);
    console.log(name);
    console.log(email);
    console.log(password);
    //console.log(password);

    //02. check if the user already exists in the database (if so throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(400).json({
        status: 400,
        error: "User already exists",
      });
      //throw new Error("User already exists");
    }
    //03. hash the password via bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    //console.log(hashedPassword);

    //04. insert the user into the database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    ); //returns the new user object
    console.log(newUser.rows[0].user_id);

    //05. generate a  jwt token and send it back to the client
    const token = jwtGenerator(newUser.rows[0].user_id); //from utils/jwtGenerator.js
    res.json({ token });

    //------------------------------------------------------------------
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//Login Route
router.post("/login", validation, async (req, res) => {
  try {
    //01 Destructure the req.body (email, password)
    const { email, password } = req.body;

    //02. check if the user exists in the database
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({
        status: 400,
        error: "User does not exist",
      });
    }
    //03. check if the password is correct
    const isMatch = await bcrypt.compare(password, user.rows[0].user_password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        error: "Password is incorrect",
      });
    }
    //04. generate a jwt token and send it back to the client
    const token = jwtGenerator(user.rows[0].user_id); //from utils/jwtGenerator.js
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//Verify Route
router.get("/verify", auth, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

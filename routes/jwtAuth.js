const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");


router.post("/register", async (req, res) => {
  try {
    //01. destructure the req.body (name, email, password)
    const { name, email, password } = req.body;
    console.log(req.body);
    console.log(password);

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
    res.json(newUser.rows[0]);
    //05. generate a  jwt token
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

const router = require("express").Router();
const pool = require("../db");

router.post("/register", async (req, res) => {
  try {
    //01. destructure the req.body (name, email, password)
    const { name, email, password } = req.body;

    //02. check if the user already exists in the database (if so throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
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
    //04. insert the user into the database
    //05. generate a  jwt token
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

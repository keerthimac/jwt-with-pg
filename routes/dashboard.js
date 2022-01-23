const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const validation = require("../middleware/validation");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name,user_id FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

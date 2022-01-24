const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const validation = require("../middleware/validation");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    //console.log(req.user);
    const user = await pool.query(
      "SELECT user_first_name,user_last_name,user_id FROM users WHERE user_id = $1",
      [req.user]
    );
    //console.log(user.rows[0]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/todos", auth, async (req, res) => {
  try {
    console.log(req.user);
    const todos = await pool.query(
      "SELECT * FROM users INNER JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1 ORDER BY todo_id DESC",
      [req.user]
    );
    //const todos = await pool.query("SELECT * FROM todos ORDER BY todo_id DESC");

    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//CREATE a todo
router.post("/todos", auth, async (req, res) => {
  try {
    const { description, id } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description, user_id) VALUES ($1,$2) RETURNING *",
      [description, id]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

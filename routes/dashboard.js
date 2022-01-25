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

//GET Todos
router.get("/todos", auth, async (req, res) => {
  try {
    console.log(req.user);
    const todos = await pool.query(
      "SELECT users.user_id,todos.user_id,todos.todo_id,todos.description FROM users INNER JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1 ORDER BY todo_id DESC",
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
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description, user_id) VALUES ($1,$2) RETURNING *",
      [description, req.user]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE a todo
router.put("/todos/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log(req.user);
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user]
    );
    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE a todo
router.delete("/todos/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user]
    );
    res.json(deleteTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(express.json()); //for access req.body
app.use(cors());

//ROUTES

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//get all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));

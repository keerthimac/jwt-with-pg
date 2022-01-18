const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json()); //for access req.body
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));

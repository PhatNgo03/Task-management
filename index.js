const express = require("express");
require("dotenv").config();
const database = require("./config/database");

database.connect();

const app = express();
const port = process.env.port;

// Import route
const taskRoutes = require("./api/v1/routes/index.route");
app.use(taskRoutes); 


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
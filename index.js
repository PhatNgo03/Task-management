const express = require("express");
const cors = require('cors');
const database = require("./config/database");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require("dotenv").config();

// Import route
const routesApiVer1  = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.port;

database.connect();

//Cookie parser
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json())

//CORS
app.use(cors());

// Routes version 1
routesApiVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
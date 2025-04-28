const express = require("express");
const cors = require('cors');
const database = require("./config/database");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require("dotenv").config();

// Import route
const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();

// Kết nối database
database.connect();

// Cookie parser
app.use(cookieParser());

// Parse application/json
app.use(bodyParser.json());

// CORS
app.use(cors({
  origin: '*',
  credentials: true
}));

// Routes version 1
routesApiVer1(app);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App is running locally on http://localhost:${port}`);
  });
}
module.exports = app; 

var express = require("express");
const cors = require("cors");
var morgan = require("morgan");
var routes = require("./routes/index");
const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use(morgan("dev"));

app.use("/", routes);

module.exports = app;

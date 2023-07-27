const express = require("express");
const path = require("path");
const errorHandler = require("./middleware/error/errorHandler");
require("dotenv").config({ path: __dirname + "/config/.env" });
const { generalRateLimiter } = require("./utils/rateLimiters");
require("./db/mongoose");

const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use(generalRateLimiter);
app.use(userRouter);

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use(errorHandler);
module.exports = app;

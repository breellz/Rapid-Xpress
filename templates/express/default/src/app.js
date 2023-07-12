const express = require("express");
const path = require("path");
require("dotenv").config({ path: __dirname + "/config/.env" });
require("./db/mongoose");
const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use(userRouter);

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
module.exports = app;

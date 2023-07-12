const express = require("express");
const path = require("path");
//configure dotenv
require("dotenv").config({ path: "./config/dev.env" });
require("./db/mongoose");
const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
module.exports = app;

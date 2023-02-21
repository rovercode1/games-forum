const express = require("express");
const app = express();
const { getCategories } = require("./controllers/forum-controllers");
const {
  handleServerErrors,
  handle404Errors,
} = require("./controllers/error-handling");

app.get("/api/categories", getCategories);

app.use(handle404Errors);
app.use(handleServerErrors);
module.exports = app;

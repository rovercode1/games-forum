const express = require("express");
const app = express();
const {
  getCategories,
  getReviewById,
} = require("./controllers/controllers");
const {
  handleServerErrors,
  handle404Errors,
  handle400Errors,
} = require("./controllers/error-handling");

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);

app.use(handle404Errors);

app.use(handle400Errors);
app.use(handleServerErrors);
module.exports = app;

const express = require("express");
const app = express();
const { getCategories, getReviewById} = require("./controllers/forum-controllers");
const {
  handleServerErrors,
  handle404Errors,
} = require("./controllers/error-handling");

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);

app.use(handle404Errors);
app.use(handleServerErrors);
module.exports = app;

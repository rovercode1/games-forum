const express = require("express");
const app = express();
const {
  getCategories,
  getReviewById,
  getReviews,
} = require("./controllers/controllers");
const {
  handleServerErrors,
  handle404Errors,
  handle400Errors,
  handle500statuses,
} = require("./controllers/controllers");

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);

app.use(handle404Errors);
app.use(handle400Errors);
app.use(handleServerErrors);
app.use(handle500statuses);

module.exports = app;

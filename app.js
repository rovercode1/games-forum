const express = require("express");
const app = express();
const { getCategories ,getCommentsByReviewId} = require("./controllers/forum-controllers");
const {
  handleServerErrors,
  handle404Errors,
  handle400Errors
} = require("./controllers/error-handling");

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);


app.use(handle404Errors);

app.use(handle400Errors)
app.use(handleServerErrors);
module.exports = app;
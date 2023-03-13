const express = require("express");
const cors = require('cors');
const app = express();

const {
  getCategories,
  getReviews,
  getUsers,
  getReviewById,
  getCommentsByReviewid,

  postComment,
  patchReviewById,

  handleServerErrors,
  handle404Errors,
  handle400Errors,
  handle500statuses,
} = require("./controllers/controllers");

app.use(cors());
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/users", getUsers);

app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewid);
app.patch("/api/reviews/:review_id", patchReviewById);

app.post("/api/reviews/:review_id/comments", postComment);

app.use(handle404Errors);
app.use(handle400Errors);
app.use(handleServerErrors);
app.use(handle500statuses);

module.exports = app;

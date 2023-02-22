const express = require("express");
const app = express();
const {getReviews, getReviewById} = require('./controllers/review-controllers')
const { getCategories } = require("./controllers/category-controllers");
const {
  handleServerErrors,
  handle404Errors,
  handle400Errors
} = require("./controllers/error-handling");


app.get("/api/categories", getCategories);

app.get('/api/reviews', getReviews)
app.get("/api/reviews/:review_id", getReviewById);
app.use(handle400Errors);
app.use(handle404Errors);

app.use(handleServerErrors)

module.exports = app

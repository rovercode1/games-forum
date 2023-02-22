const express = require("express");
const app = express();
const {getReviews} = require('./controllers/forum-controllers')
const { getCategories } = require("./controllers/forum-controllers");
const {
  handleServerErrors,
  handle404Errors,
  handle400Errors
} = require("./controllers/error-handling");


app.get("/api/categories", getCategories);

app.get('/api/reviews', getReviews)

app.use(handle404Errors);

app.use(handleServerErrors)

module.exports = app

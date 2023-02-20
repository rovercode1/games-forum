const express = require('express');
const app = express();
const {handleServerErrors} = require('./controllers/error-handling')
const {getReviews} = require('./controllers/forum-controllers')


app.get('/api/reviews', getReviews)

app.use(handleServerErrors)

module.exports = app
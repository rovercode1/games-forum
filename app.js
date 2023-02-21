const express = require('express');
const app = express();
const {handleServerErrors, handle404Errors} = require('./controllers/error-handling')
const {getReviews} = require('./controllers/forum-controllers')


app.get('/api/reviews', getReviews)

app.use(handle404Errors);

app.use(handleServerErrors)

module.exports = app
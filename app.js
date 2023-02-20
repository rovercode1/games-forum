const express = require('express');
const app = express();
const {getCategories} = require('./controllers/forum-controllers')
const {handleServerErrors} = require('./controllers/error-handling')


app.get('/api/categories', getCategories);

app.use(handleServerErrors)

module.exports = app
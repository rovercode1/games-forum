const express = require('express');
const app = express();
const {handleServerErrors} = require('./controllers/error-handling')



app.use(handleServerErrors)

module.exports = app
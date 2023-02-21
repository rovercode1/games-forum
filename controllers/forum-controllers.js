const {selectReviews} = require('../models/models')

exports.getReviews = (request, response, next)=>{
  selectReviews().then((reviews)=>{
    response.status(200).send(reviews)
  }).catch((err)=>{
    next(err)
  })
}
const {selectReviews} = require('../models/models')

exports.getReviews = (request, response, next)=>{
  selectReviews().then((reviewsObj)=>{
    response.status(200).send(reviewsObj)
  }).catch((err)=>{
    next(err)
  })
}
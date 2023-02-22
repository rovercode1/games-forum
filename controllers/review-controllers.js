const {selectReviewById, selectReviews } = require("../models/review-models");

exports.getReviews = (request, response, next)=>{
  selectReviews().then((reviews)=>{
    response.status(200).send(reviews)
  }).catch((err)=>{
    next(err)
  })
}


exports.getReviewById = (request, response, next)=>{
  const reviewId = request.params.review_id;

  selectReviewById(reviewId)
    .then((review)=>{
      response.status(200).send({review: review})
    }).catch((err)=>{
      next(err)
    })
}
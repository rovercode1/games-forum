const {selectReviewById } = require("../models/review-models");

exports.getReviewById = (request, response, next)=>{
  const reviewId = request.params.review_id;

  selectReviewById(reviewId)
    .then((review)=>{
      response.status(200).send({review: review})
    }).catch((err)=>{
      next(err)
    })
}
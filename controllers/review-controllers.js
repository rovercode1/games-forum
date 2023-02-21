const {selectReviewById } = require("../models/review-models");

exports.getReviewById = (request, response, next)=>{
  const reviewId = request.params.review_id;

  selectReviewById(reviewId)
    .then((reviewObj)=>{
      response.status(200).send(reviewObj)
    }).catch((err)=>{
      next(err)
    })
}
const {selectReviews, selectReviewById, updateReviewById} = require('../models/review-models')


exports.getReviews = (request, response, next)=>{

  selectReviews(request.query).then((reviews)=>{
    response.status(200).send({reviews: reviews})
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

exports.patchReviewById = (request, response, next)=>{
  const reviewId = request.params.review_id;
  const votesUpdate = request.body.inc_votes

  updateReviewById(reviewId, votesUpdate)
  .then((review)=>{
    response.status(201).send({review: review})
  }).catch((err)=>{
    next(err)
  })

  
}
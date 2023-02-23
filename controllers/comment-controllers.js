const {selectComments} = require('../models/comment-models')

exports.getCommentsByReviewid = (request, response, next) => {

  const reviewId = request.params.review_id;

  selectComments(reviewId).then((comments) => {
      response.status(200).send({ comments: comments });

    })
    .catch((err) => {
      next(err);
    });

};


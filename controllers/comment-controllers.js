const { insertComment, selectComments } = require("../models/comment-models");

exports.postComment = (request, response, next) => {
  const newComment = request.body;
  const reviewId = request.params.review_id;

  insertComment(newComment, reviewId)
    .then((postedComment) => {
      response.status(201).send({ comment: postedComment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByReviewid = (request, response, next) => {
  const reviewId = request.params.review_id;

  selectComments(reviewId)
    .then((comments) => {
      response.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

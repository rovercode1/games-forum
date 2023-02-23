const { insertComment } = require("../models/comment-models");

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

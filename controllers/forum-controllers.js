const { selectCategories, selectComments } = require("../models/models.js");
exports.getCategories = (request, response, next) => {
  selectCategories()
    .then((categories) => {
      response.status(200).send({ categories: categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByReviewId = (request, response, next) => {
  const reviewId = request.params['review_id'] 

  selectComments(reviewId)
    .then((comments) => {
      response.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

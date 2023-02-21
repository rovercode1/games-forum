const { selectCategories, selectReviewById } = require("../models/models.js");
exports.getCategories = (request, response, next) => {
  selectCategories()
    .then((categoriesObj) => {
      response.status(200).send({ categories: categoriesObj });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (request, response, next)=>{
  const reviewId = request.params.review_id;

  selectReviewById(reviewId)
    .then((reviewObj)=>{
      response.status(200).send(reviewObj)
    }).catch((err)=>{
      next(err)
    })
}

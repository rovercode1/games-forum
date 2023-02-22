
const {selectReviews, selectCategories} = require('../models/models')

exports.getReviews = (request, response, next)=>{
  selectReviews().then((reviews)=>{
    response.status(200).send(reviews)
  }).catch((err)=>{
    next(err)
  })
}

exports.getCategories = (request, response, next) => {
  selectCategories()
    .then((categoriesObj) => {
      response.status(200).send({ categories: categoriesObj });
    })
    .catch((err) => {
      next(err);
    });
};


const {selectCategories} = require('../models/category-models')

exports.getCategories = (request, response, next) => {
  selectCategories()
    .then((categories) => {
      response.status(200).send({ categories: categories });

    })
    .catch((err) => {
      next(err);
    });

};



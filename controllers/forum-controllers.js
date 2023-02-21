const { selectCategories } = require("../models/models.js");
exports.getCategories = (request, response, next) => {
  selectCategories()
    .then((categoriesObj) => {
      response.status(200).send({ categories: categoriesObj });
    })
    .catch((err) => {
      next(err);
    });
};

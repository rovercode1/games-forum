const { getCategories } = require("./category-controllers.js");
const { getReviews, getReviewById } = require("./review-controllers.js");
const { getCommentsByReviewid } = require("./comment-controllers.js");
const {
  handle404Errors,
  handle400Errors,
  handleServerErrors,
  handle500statuses,
} = require("./error-handling.js");

module.exports = {
  getReviews,
  getReviewById,
  getCategories,
  handle404Errors,
  handle400Errors,
  handleServerErrors,
  handle500statuses,
  getCommentsByReviewid
};

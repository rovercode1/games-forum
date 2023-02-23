const { getCategories } = require("./category-controllers");
const { postComment } = require("./comment-controllers");
const { getReviews, getReviewById } = require("./review-controllers");

const {
  handle404Errors,
  handle400Errors,
  handleServerErrors,
  handle500statuses,
} = require("./error-handling");

module.exports = {
  getReviews,
  getReviewById,
  getCategories,
  handle404Errors,
  handle400Errors,
  handleServerErrors,
  handle500statuses,
  postComment
};


const { getCategories } = require("./category-controllers.js");
const { getReviews, getReviewById, patchReviewById } = require("./review-controllers.js");
const { getCommentsByReviewid, postComment } = require("./comment-controllers.js");

const {
  handle404Errors,
  handle400Errors,
  handleServerErrors,
  handle500statuses,
} = require("./error-handling.js");


module.exports = {
  getReviews,
  getReviewById,
  patchReviewById,
  getCategories,
  handle404Errors,
  handle400Errors,
  handleServerErrors,
  handle500statuses,
  postComment,
  getCommentsByReviewid

};

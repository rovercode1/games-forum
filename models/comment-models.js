const db = require("./../db/connection.js");
const format = require("pg-format");

exports.selectComments = (reviewId) => {
  let queryStr = `
  SELECT reviews.review_id, comments.comment_id,  comments.votes, comments.created_at, comments.author, comments.body, COUNT(comment_id) as comment_count
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id 
  `;
  let queryParam = [];

  if (reviewId !== undefined) {
    queryStr += `
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id, comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body
    ORDER BY created_at DESC
    `;
    queryParam.push(reviewId);
  }

  return db.query(queryStr, queryParam).then((comments) => {
    if (comments.rowCount === 0) {
      return Promise.reject("Comments not found.");
    }
    const comment_count = comments.rows[0].comment_count;

    if (+comment_count === 0) {
      return [];
    }
    return comments.rows;
  });
};

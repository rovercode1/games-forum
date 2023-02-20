const db = require("./../db/connection.js");
const format = require("pg-format");
exports.selectReviews = () => {
  return db
    .query("SELECT * FROM reviews ORDER BY created_at DESC")
    .then((reviews) => {
      return reviews.rows;
    })
    .then((reviews) => {
      const dbQuery = `SELECT
      review_id,
      COUNT(*)
      FROM
      comments
      GROUP BY
      review_id;
      `;

      return Promise.all([db.query(dbQuery), reviews]);
    })
    .then((promiseArray) => {
      const [comment_count, reviews] = [promiseArray[0].rows, promiseArray[1]];

      const updatedReviews = reviews.map((review) => {
        review.comment_count = 0;

        for (let i = 0; i < comment_count.length; i++) {
          if (review.review_id === comment_count[i].review_id) {
            review.comment_count = comment_count[i].count;
          }
        }
        return review;
      });

      return updatedReviews
    });
};

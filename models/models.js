const db = require("./../db/connection.js");
const format = require("pg-format");
exports.selectReviews = () => {
  return db
    .query(`SELECT reviews.title, reviews.owner , reviews.review_id, reviews.category, review_img_url, reviews.review_body, reviews.created_at, reviews.votes, reviews.designer, COUNT(comment_id) as comment_count
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id 
    GROUP BY reviews.review_id
    ORDER BY created_at DESC
    `)
    .then((reviews) => {
      return reviews.rows;
    })

};

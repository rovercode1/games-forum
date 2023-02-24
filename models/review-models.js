const db = require("./../db/connection.js");

exports.selectReviews = () => {
  return db
    .query(
      `SELECT reviews.title, reviews.owner , reviews.review_id, reviews.category, review_img_url, reviews.review_body, reviews.created_at, reviews.votes, reviews.designer, COUNT(comment_id) as comment_count
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id 
    GROUP BY reviews.review_id
    ORDER BY created_at DESC
    `
    )
    .then((reviews) => {
      return reviews.rows;
    });
};

exports.selectReviewById = (reviewId) => {
  let queryString = `
  SELECT reviews.title, reviews.owner , reviews.review_id, reviews.category, review_img_url, reviews.review_body, reviews.created_at, reviews.votes, reviews.designer, COUNT(comment_id) as comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id 
  `;
  let queryParam = [];

  if (reviewId !== undefined) {
    queryString += ` 
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id
    ORDER BY created_at DESC
    `;
    queryParam.push(reviewId);
  }
  return db.query(queryString, queryParam).then((review) => {
    if (review.rowCount === 0) {
      return Promise.reject("Content not found.");
    }
    return review.rows[0];
  });
};

exports.updateReviewById = (reviewId, votesUpdate) => {
  let queryString = `
  UPDATE reviews
  SET votes = votes + $1`;

  let queryParam = [votesUpdate];

  if (reviewId !== undefined) {
    queryString += ` WHERE review_id = $2  RETURNING *`;
    queryParam.push(reviewId);
  }

  return db.query(queryString, queryParam).then((review) => {
    if (review.rowCount === 0) {
      return Promise.reject("Content not found.");
    }
    return review.rows[0];
  });
};

const db = require("./../db/connection.js");
const format = require("pg-format");

exports.insertComment = (newComment, reviewId) => {
  const formattedComment = [newComment.body, newComment.username, +reviewId];

  const queryStr = `
    INSERT INTO comments (body, author, review_id) 
    VALUES 
      ($1, $2, $3) 
    RETURNING *;`;

    return db.query(queryStr, formattedComment)
    .then((postedComment) => {
    return postedComment.rows[0];
  });
};

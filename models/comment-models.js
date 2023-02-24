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
exports.selectComments = (reviewId) => {
  let queryStr = 'SELECT * FROM comments'
  let queryParam = []

  if(reviewId !== undefined){
    queryStr+= ' WHERE review_id = $1 ORDER BY created_at DESC'
    queryParam.push(reviewId)

  }
  
  return db
  .query(queryStr, queryParam)
  .then((comments)=>{
    if(comments.rowCount === 0){
      return Promise.reject('Content not found.')
    }
    return comments.rows
  })
}

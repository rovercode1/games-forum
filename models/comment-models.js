const db = require("./../db/connection.js");
const format = require("pg-format");

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
      return Promise.reject('Comments not found.')
    }
    return comments.rows
  })
}
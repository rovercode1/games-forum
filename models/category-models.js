const db = require("./../db/connection.js");
const format = require("pg-format");

exports.selectCategories = () => {
  return db
  .query('SELECT * FROM categories;')
  .then((result)=>{
    return result.rows
  })
}

exports.selectComments = (reviewId)=>{

  //check valid 

  let queryStr = 'SELECT * FROM comments';
  let queryParms = [];


  if(reviewId !== undefined){
    queryStr += ' WHERE review_id = $1 ORDER BY created_at DESC'
    queryParms.push(reviewId)
  }

  return db
  .query(queryStr, queryParms)
  .then((comments)=>{

    if(comments.rowCount === 0 ){
      return Promise.reject('Comments not found')
    }

    return comments.rows
  })
}

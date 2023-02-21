const db = require('./../db/connection.js');
exports.selectCategories = () => {
  return db
  .query('SELECT * FROM categories;')
  .then((result)=>{
    return result.rows
  })
}

exports.selectReviewById = (reviewId) => {

  //if no id
  let queryString = 'SELECT * FROM reviews';
  let queryParam = [];

  if(reviewId !== undefined){

    queryString+= ' WHERE review_id = $1';
    queryParam.push(reviewId);
  }
  return db
  .query(queryString, queryParam)
  .then((review)=>{
    return review.rows
  })

}
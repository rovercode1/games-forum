const db = require('./../db/connection.js');
exports.selectReviewById = (reviewId) => {

  //Check reviewId is valid
    const regEx = /^\d+$/gm
  
    if(regEx.test(parseInt(reviewId)) === false){
      return Promise.reject('Invalid review_id')
    }
  
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
      if(review.rowCount === 0){
        return Promise.reject('review_id not found')
      }
      return review.rows[0]
    })
  
  }
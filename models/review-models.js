const { query } = require("./../db/connection.js");
const db = require("./../db/connection.js");

exports.selectReviews = (queries) => {
  if(queries.category.includes("'")){
    queries.category = queries.category.replaceAll("'","''") 
  }

  const vaildCategories = [
    "euro game",
    "social deduction",
    "dexterity",
    "children's games",
  ];

  // if(!vaildCategories.includes(queries.category)){
  //   return Promise('Bad request')
  // }

  let queryString = `
  SELECT reviews.title, reviews.owner, reviews.review_id, reviews.category, review_img_url, reviews.review_body, reviews.created_at, reviews.votes, reviews.designer, COUNT(comment_id) as comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id 
  `

  if(queries.category!== undefined) {
    const category = `'${queries.category}'`
    queryString += ` 
    WHERE reviews.category=${category}
    GROUP BY reviews.review_id`;

  }else{
    queryString += ` 
    GROUP BY reviews.review_id`;
  }

  if(queries.sort_by !== undefined){
    queryString += ` 
    ORDER BY reviews.${queries.sort_by}`;
  }else{
    queryString += ` 
    ORDER BY reviews.created_at`;

  }

  if(queries.order !== undefined){
    queryString += ` ${queries.order}`;
  }else{
    queryString += ` DESC`

  }

  console.log(queryString)
  return db
  .query(queryString)
  .then((reviews) => {
      return reviews.rows;
    });
};

exports.selectReviewById = (reviewId) => {
  let queryString = "SELECT * FROM reviews";
  let queryParam = [];

  if (reviewId !== undefined) {
    queryString += " WHERE review_id = $1";
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
    console.log(review.rowCount)
    if (review.rowCount === 0) {
      return Promise.reject("Content not found.");
    }
    return review.rows[0];
  });
};

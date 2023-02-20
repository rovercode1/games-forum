const db = require('./../db/connection.js');
exports.selectCategories = () => {
  return db
  .query('SELECT * FROM comments;')
  .then((result)=>{
    return result.rows
  })
}
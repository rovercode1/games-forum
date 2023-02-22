
const db = require("../db/connection.js");
const format = require("pg-format");

exports.selectCategories = () => {
  return db
  .query('SELECT * FROM categories;')
  .then((result)=>{
    return result.rows
  })
}


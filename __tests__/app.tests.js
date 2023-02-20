const request = require("supertest");
const app = require("../app");

describe('api',()=>{
  describe('/api/categories',()=>{
    it('200 - response ok status',()=>{
      return request(app)
      .get('/api/categories')
      .expect(200)
      .then(({body})=>{
        const categories = body
        console.log(categories , '<-response')
      })
    })
  })
})
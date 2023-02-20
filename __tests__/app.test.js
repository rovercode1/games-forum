const request = require("supertest");
const app = require("../app");
const connection = require('../db/connection')

const seed = require("./../db/seeds/seed");
const data = require('../db/data/test-data')
const categoryData = require('./../db/data/test-data/categories')

beforeEach(() => seed(data));

afterAll(() => connection.end());
describe('api',()=>{
  describe('/api/categories',()=>{
    it('200 - response ok status',()=>{
      return request(app)
      .get('/api/categories')
      .expect(200)
      .then(({body})=>{
        const categories = body.categories

        expect(categories.length).toBe(6)
        console.log(categories , '<-response')
      })
    })
  })
})
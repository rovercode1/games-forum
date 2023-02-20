const request = require("supertest");
const app = require("../app");
const connection = require('../db/connection')

const seed = require("./../db/seeds/seed");
const data = require('../db/data/test-data')

beforeEach(() => seed(data));

afterAll(() => connection.end());
describe('api',()=>{
  describe('/api/reviews', ()=>{
    it('200 GET - responds array of review objects, including the correct properties ',()=>{
      return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(( {body} )=>{
        const reviews = body
        expect(reviews.length).toBe(13)

        reviews.forEach((review)=>{
          expect(
            review.hasOwnProperty("owner", expect.any(String))
          ).toBe(true);
          expect(
            review.hasOwnProperty("title", expect.any(String))
          ).toBe(true);
          expect(
            review.hasOwnProperty("review_id", expect.any(Number))
          ).toBe(true);
          expect(
            review.hasOwnProperty("category", expect.any(String))
          ).toBe(true);
          expect(
            review.hasOwnProperty("review_img_url", expect.any(String))
          ).toBe(true);
          expect(
            review.hasOwnProperty("created_at", expect.any(Number))
          ).toBe(true);
                  expect(
            review.hasOwnProperty("votes", expect.any(Number))
          ).toBe(true);
                  expect(
            review.hasOwnProperty("designer", expect.any(String))
          ).toBe(true);
                  expect(
            review.hasOwnProperty("comment_count", expect.any(Number))
          ).toBe(true);
        })
//the reviews should be sorted by date in descending order.
      })
    })
    it('200 GET - the reviews should be sorted by date in descending order',()=>{
      return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(( {body} )=>{
        const reviews = body
      // console.log(expected, '<= sorted')
      expect(reviews[0].created_at).toEqual('2021-01-25T11:16:54.963Z')
    })
      
    })
  })
})
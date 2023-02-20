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
        expect(Array.isArray(reviews)).toBe(true)

        reviews.forEach((review)=>{
          expect(
            review.hasOwnProperty("owner", expect.any(Number))
          ).toBe(true);
          expect(
            review.hasOwnProperty("title", expect.any(Number))
          ).toBe(true);
          expect(
            review.hasOwnProperty("review_id", expect.any(Number))
          ).toBe(true);
          expect(
            review.hasOwnProperty("category", expect.any(Number))
          ).toBe(true);
          expect(
            review.hasOwnProperty("review_img_url", expect.any(Number))
          ).toBe(true);
          expect(
            review.hasOwnProperty("created_at", expect.any(Number))
          ).toBe(true);
                  expect(
            review.hasOwnProperty("votes", expect.any(Number))
          ).toBe(true);
                  expect(
            review.hasOwnProperty("designer", expect.any(Number))
          ).toBe(true);
                  expect(
            review.hasOwnProperty("comment_count", expect.any(Number))
          ).toBe(true);
        })
      })
    })
  })
})
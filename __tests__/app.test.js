const request = require("supertest");
const app = require("../app");
const connection = require('../db/connection')

const seed = require("./../db/seeds/seed");
const data = require('../db/data/test-data')

beforeEach(() => seed(data));

afterAll(() => connection.end());
describe('api',()=>{

  describe('/notARoute',()=>{
    it('404 GET - responds with  not found message.',()=>{
      return request(app)
      .get('/notARoute')
      .expect(404)
      .then(({ body }) => {
        const serverResponseMsg = body.msg;
        expect(serverResponseMsg).toBe("Path not found");
      });
      
    })
  })


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

        const foundReview = reviews.find((review)=>{if(review.review_id === 2){return review}}) 

        expect(foundReview.comment_count).toBe('3')

      })
    })
    it('200 GET - the reviews should be sorted by date in descending order',()=>{
      return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(( {body} )=>{
        const reviews = body

        const reviewDates = reviews.map((review)=>{return review.created_at})
        expect(reviewDates).toBeSorted({ descending: true });
    })
      
    })
  })
})
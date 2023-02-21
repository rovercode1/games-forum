const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

const seed = require("./../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));

afterAll(() => connection.end());
describe("api", () => {
  describe("server errors", () => {
    it("404 - responds with msg when sent unavailable.", () => {
      return request(app)
        .get("/notARoute")
        .expect(404)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Path not found");
        });
    });
  });

  describe("/api/categories", () => {
    it("200 - response with correct properties.", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          const categories = body.categories;

          expect(categories.length).toBe(4);
          categories.forEach((category) => {
            expect(category.hasOwnProperty("slug", expect.any(String))).toBe(
              true
            );
            expect(
              category.hasOwnProperty("description", expect.any(String))
            ).toBe(true);
          });
        });
    });
  });
  // Responds with:

  // a review object, which should have the following properties:

  describe("/api/reviews/review_id", () => {
    it("200 - responds with single review object", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({ body }) => {
          const review = body;
          //Should be an Object

          console.log(review);

          expect(review.review_id).toBe(2);
          expect(review.title).toBe('Jenga');
          expect(review.category).toBe('dexterity');
          expect(review.designer).toBe('Leslie Scott');
          
          expect(review.owner).toBe('philippaclaire9');
          expect(review.review_body).toBe('Fiddly fun for all the family');
          expect(review.review_img_url).toBe('https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700');
          expect(review.created_at).toBe('2021-01-18T10:01:41.251Z');
          expect(review.votes).toBe(5);
        });
    });

    it("400 - responds with msg bad request", () => {
      return request(app)
        .get("/api/reviews/bad-request")
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad request");
        });
    });

    it("404 - responds with msg when sent valid but non-existent path", () => {
      return request(app)
        .get("/api/reviews/99999999")
        .expect(404)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("review_id not found");
        });
    });
  });
});

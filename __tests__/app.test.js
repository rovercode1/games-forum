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
    it("200 - responds with review object", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(1);
          const review = body[0];
          //Should be an Object

          expect(review.hasOwnProperty("review_id", expect.any(Number))).toBe(
            true
          );
          expect(review.hasOwnProperty("title", expect.any(String))).toBe(true);
          expect(review.hasOwnProperty("review_body", expect.any(String))).toBe(
            true
          );
          expect(review.hasOwnProperty("designer", expect.any(String))).toBe(
            true
          );
          expect(
            review.hasOwnProperty("review_img_url", expect.any(String))
          ).toBe(true);
          expect(review.hasOwnProperty("votes", expect.any(Number))).toBe(true);
          expect(review.hasOwnProperty("category", expect.any(String))).toBe(
            true
          );
          expect(review.hasOwnProperty("owner", expect.any(String))).toBe(true);
          expect(review.hasOwnProperty("created_at", expect.any(String))).toBe(
            true
          );
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

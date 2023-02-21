const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

const seed = require("./../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));

afterAll(() => connection.end());
describe("api", () => {
  describe("server errors", () => {
    it("400 - responds with msg when sent valid but non-existent path", () => {
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
    it("200 - responses with all catgories", () => {
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

  describe("/api/reviews/:review_id/comments", () => {
    it.only("200 - respondes with all comments with specific review id", () => {
      return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body.comments;
          console.log(comments);
          expect(comments.length).toBe(6);

          comments.forEach((comment) => {

            expect(
              comment.hasOwnProperty("comment_id", expect.any(Number))
            ).toBe(true);

            expect(
              comment.hasOwnProperty("votes", expect.any(Number))
            ).toBe(true);

            expect(
              comment.hasOwnProperty("created_at", expect.any(Number))
            ).toBe(true);

            expect(
              comment.hasOwnProperty("author", expect.any(Number))
            ).toBe(true);

            expect(
              comment.hasOwnProperty("body", expect.any(Number))
            ).toBe(true);

            expect(
              comment.hasOwnProperty("review_id", expect.any(Number))
            ).toBe(true);
          });

          // comments should be served with the most recent comments first
        });
    });

    it("400 - respondes with 400 error message", () => {
      return request(app)
        .get("/api/reviews/30000/comments")
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Comments not found");

          // comments should be served with the most recent comments first
        });
    });

    it("404 - respondes with 404 error message ", () => {
      return request(app)
        .get("/api/reviews/bad-request/comments")
        .expect(404)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad Request");

          // comments should be served with the most recent comments first
        });
    });
  });
});

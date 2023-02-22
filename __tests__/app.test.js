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
          expect(serverResponseMsg).toBe("Path not found.");
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

  describe("/api/reviews", () => {
    it("200 GET - responds array of review objects, including the correct properties ", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          const reviews = body;
          expect(reviews.length).toBe(13);
          reviews.forEach((review) => {
            expect(review.hasOwnProperty("owner", expect.any(String))).toBe(
              true
            );
            expect(review.hasOwnProperty("title", expect.any(String))).toBe(
              true
            );
            expect(review.hasOwnProperty("review_id", expect.any(Number))).toBe(
              true
            );
            expect(review.hasOwnProperty("category", expect.any(String))).toBe(
              true
            );
            expect(
              review.hasOwnProperty("review_img_url", expect.any(String))
            ).toBe(true);
            expect(
              review.hasOwnProperty("created_at", expect.any(Number))
            ).toBe(true);
            expect(review.hasOwnProperty("votes", expect.any(Number))).toBe(
              true
            );
            expect(review.hasOwnProperty("designer", expect.any(String))).toBe(
              true
            );
            expect(
              review.hasOwnProperty("comment_count", expect.any(Number))
            ).toBe(true);
          });

          const foundReview = reviews.find((review) => {
            if (review.review_id === 2) {
              return review;
            }
          });

          expect(foundReview.comment_count).toBe("3");
        });
    });
    it("200 GET - the reviews should be sorted by date in descending order", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          const reviews = body;

          const reviewDates = reviews.map((review) => {
            return review.created_at;
          });
          expect(reviewDates).toBeSorted({ descending: true });
        });
    });
  });

  describe("/api/reviews/review_id", () => {
    it("200 - responds with single review object", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({ body }) => {
          const review = body.review;
          //Should be an Object

          expect(review.review_id).toBe(2);
          expect(review.title).toBe("Jenga");
          expect(review.category).toBe("dexterity");
          expect(review.designer).toBe("Leslie Scott");

          expect(review.owner).toBe("philippaclaire9");
          expect(review.review_body).toBe("Fiddly fun for all the family");
          expect(review.review_img_url).toBe(
            "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700"
          );
          expect(review.created_at).toBe("2021-01-18T10:01:41.251Z");
          expect(review.votes).toBe(5);
        });
    });

    it("400 - responds with msg bad request", () => {
      return request(app)
        .get("/api/reviews/bad-request")
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad request.");
        });
    });

    it("404 - responds with msg when sent valid but non-existent path", () => {
      return request(app)
        .get("/api/reviews/99999999")
        .expect(404)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("review_id not found.");
        });
    });
  });

  //TODO
  describe("/api/reviews/:review_id/comments", () => {
    it("200 GET - responds with an array of comments for the given review_id", () => {
      return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body.comments;
          expect(body.comments.length).toBe(3);
          comments.forEach((comment) => {
            // console.log(typeof comment.comment_id)
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.created_at).toBe("string");
            expect(typeof comment.author).toBe("string");
            expect(typeof comment.body).toBe("string");
            expect(typeof comment.review_id).toBe("number");
          });
        });
      ///
    });

    it("200 GET - comments should be sorted by date in descending order", () => {
      return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body.comments;
          // comments should be served with the most recent comments first
          const commentDates = comments.map((comment) => {
            return comment.created_at;
          });
          expect(commentDates).toBeSorted({ descending: true });
        });
    });

    it("404 - responds with msg when sent valid but non-existent path.", () => {
      return request(app)
        .get("/api/reviews/74872/comments")
        .expect(404)
        .then(({ body }) => {
          console.log(body)
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Comments not found.");
        });
    });

    it("400 - responds with msg bad request", () => {
      return request(app)
        .get("/api/reviews/bad-request/comments")
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad request.");
        });
    });
  });
});

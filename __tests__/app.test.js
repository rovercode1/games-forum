const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

const seed = require("./../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));

afterAll(() => connection.end());

describe("api", () => {
  describe("server errors", () => {
    it("404 GET - responds with msg when sent unavailable.", () => {
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
    it("200 GET - responds with all catgories with correct properties.", () => {
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
    it("200 GET - responds array of review objects, including the correct properties.", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          const reviews = body.reviews;
          expect(reviews.length).toBe(13);
          reviews.forEach((review) => {
            expect(review).toMatchObject({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              designer: expect.any(String),
              comment_count: expect.any(String),
            });
          });

          const foundReview = reviews.find((review) => {
            if (review.review_id === 2) {
              return review;
            }
          });

          expect(foundReview.comment_count).toBe("3");
        });
    });
    it("200 GET - the reviews should be sorted by date in descending order.", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          const reviews = body.reviews;

          const reviewDates = reviews.map((review) => {
            return review.created_at;
          });
          expect(reviewDates).toBeSorted({ descending: true });
        });
    });
  });

  describe("/api/reviews?query", () => {
    it("200 GET - responds with an array of review objects where category = query.", () => {
      return request(app)
        .get("/api/reviews?category=euro+game")
        .expect(200)
        .then(({ body }) => {
          const reviews = body.reviews;
          expect(reviews[0]).toMatchObject({
            title: "Agricola",
            owner: "mallionaire",
            review_id: 1,
            category: "euro game",
            review_img_url:
              "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
            review_body: "Farmyard fun!",
            created_at: "2021-01-18T10:00:20.514Z",
            votes: 1,
            designer: "Uwe Rosenberg",
            comment_count: "0",
          });
        });
    });

    it("200 GET - responds with an array of review objects where sort_by = query.", () => {
      return request(app)
        .get("/api/reviews?sort_by=owner")
        .expect(200)
        .then(({ body }) => {
          const reviews = body.reviews;
          expect(reviews.length).toBe(13);
          expect(reviews[0].owner).toBe("philippaclaire9");
          const reviewOwners = reviews.map((review) => {
            return review.owner;
          });
          expect(reviewOwners).toBeSorted({ descending: true });
        });
    });

    it("200 GET - responds with an array of review objects where order = query.", () => {
      return request(app)
        .get("/api/reviews?order=asc")
        .expect(200)
        .then(({ body }) => {
          const reviews = body.reviews;
          expect(reviews.length).toBe(13);
          expect(reviews[0].review_id).toBe(13);
          const reviewDefault = reviews.map((review) => {
            return review.created_at;
          });
          expect(reviewDefault).toBeSorted({ descending: false });
        });
    });

    it("200 GET - responds with queried array of review objects.", () => {
      return request(app)
        .get("/api/reviews?category=social+deduction&sort_by=votes&order=asc")
        .expect(200)
        .then(({ body }) => {
          const reviews = body.reviews;
          expect(reviews.length).toBe(11);
          reviews.forEach((review) => {
            expect(review).toMatchObject({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: "social deduction",
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              designer: expect.any(String),
              comment_count: expect.any(String),
            });
          });
          const reviewVotes = reviews.map((review) => {
            return review.votes;
          });
          expect(reviewVotes).toBeSorted({ descending: false });
          expect(reviews[10].votes).toBe(100);
        });
    });
    it("200 GET - endpoint should default with DESC if there isn't order query.", () => {
      return request(app)
        .get("/api/reviews?category=social+deduction&sort_by=title")
        .expect(200)
        .then(({ body }) => {
          const reviews = body.reviews;
          const reviewTitles = reviews.map((review) => {
            return review.title;
          });
          expect(reviewTitles).toBeSorted({ descending: true });
        });
    });
    it("200 GET - returns empty array if category that exists but does not have any reviews associated with it.", () => {
      return request(app)
        .get("/api/reviews?category=children%27s+games")
        .expect(200)
        .then(({ body }) => {
          const reviews = body.reviews;
          expect(reviews).toEqual([]);
        });
    });
    it("400 GET - returns msg if order !== 'asc' / 'desc'.", () => {
      return request(app)
        .get("/api/reviews?order=upside+down")
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad request.");
        });
    });

    it("400 GET - returns msg if sort by column that doesn't exist.", () => {
      return request(app)
        .get("/api/reviews?sort_by=does+not+exist")
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad request.");
        });
    });

    it("400 GET - returns msg if category is not in the database.", () => {
      return request(app)
        .get("/api/reviews?category=banana")
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad request.");
        });
    });

    describe("PATCH", () => {
      it("201 PATCH - ignores other properties responds with the updated review.", () => {
        return request(app)
          .patch("/api/reviews/2")
          .send({ inc_votes: -100, name: "Anouk" })
          .expect(201)
          .then(({ body }) => {
            const review = body.review;
            expect(review.votes).toBe(-95);
          });
      });

      it("400 PATCH - responds with msg bad request if inc_votes not included.", () => {
        return request(app)
          .patch("/api/reviews/bad-request")
          .send({ inc_votes: "notanumber" })
          .expect(400)
          .then(({ body }) => {
            const serverResponseMsg = body.msg;
            expect(serverResponseMsg).toBe("Bad request.");
          });
      });
      it("400 PATCH - responds with msg bad request if passed a non-number.", () => {
        return request(app)
          .patch("/api/reviews/bad-request")
          .send({ not_votes: 2 })
          .expect(400)
          .then(({ body }) => {
            const serverResponseMsg = body.msg;
            expect(serverResponseMsg).toBe("Bad request.");
          });
      });

      it("404 PATCH - responds with msg when sent valid but non-existent path.", () => {
        return request(app)
          .patch("/api/reviews/99999999")
          .send({ inc_votes: 5 })
          .expect(404)
          .then(({ body }) => {
            const serverResponseMsg = body.msg;
            expect(serverResponseMsg).toBe("Content not found.");
          });
      });
    });
  });

  describe("/api/reviews/review_id", () => {
    it("200 GET - responds with single review object.", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({ body }) => {
          const review = body.review;

          expect(review).toMatchObject({
            review_id: 2,
            title: "Jenga",
            category: "dexterity",
            designer: "Leslie Scott",

            owner: "philippaclaire9",
            review_body: "Fiddly fun for all the family",
            review_img_url:
              "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
          });
        });
    });

    it("400 GET - invalid review id responds with bad request msg.", () => {
      return request(app)
        .get("/api/reviews/bad-request")
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad request.");
        });
    });

    it("404 GET - responds with msg when sent valid but non-existent path.", () => {
      return request(app)
        .get("/api/reviews/99999999")
        .expect(404)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Content not found.");
        });
    });

    it("201 PATCH - responds with the updated review.", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: 100 })
        .expect(201)
        .then(({ body }) => {
          const review = body.review;

          expect(review).toMatchObject({
            review_id: 2,
            title: "Jenga",
            category: "dexterity",
            designer: "Leslie Scott",

            owner: "philippaclaire9",
            review_body: "Fiddly fun for all the family",
            review_img_url:
              "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 105,
          });
        });
    });

    it("201 PATCH - ignores other properties responds with the updated review.", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: -100, name: "Anouk" })
        .expect(201)
        .then(({ body }) => {
          const review = body.review;
          expect(review.votes).toBe(-95);
        });
    });

    it("400 PATCH - responds with msg bad request if inc_votes not included.", () => {
      return request(app)
        .patch("/api/reviews/bad-request")
        .send({ inc_votes: "notanumber" })
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad request.");
        });
    });
    it("400 PATCH - responds with msg bad request if passed a non-number.", () => {
      return request(app)
        .patch("/api/reviews/bad-request")
        .send({ not_votes: 2 })
        .expect(400)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Bad request.");
        });
    });

    it("404 PATCH - responds with msg when sent valid but non-existent path.", () => {
      return request(app)
        .patch("/api/reviews/99999999")
        .send({ inc_votes: 5 })
        .expect(404)
        .then(({ body }) => {
          const serverResponseMsg = body.msg;
          expect(serverResponseMsg).toBe("Content not found.");
        });
    });
  });

  describe("/api/reviews/:review_id/comments", () => {
    describe("POST", () => {
      it("201 POST - responds with the posted comment.", () => {
        return request(app)
          .post("/api/reviews/6/comments")
          .send({ username: "mallionaire", body: "This is a new comment!" })
          .expect(201)
          .then(({ body }) => {
            const comment = body.comment;
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              body: "This is a new comment!",
              review_id: 6,
              author: "mallionaire",
              votes: 0,
              created_at: expect.any(String),
            });
          });
      });
      it("201 POST - ignores irrelevant properties responds with the posted comment.", () => {
        return request(app)
          .post("/api/reviews/8/comments")
          .send({
            username: "mallionaire",
            body: "Ignore the fruit!",
            fruit: "banana",
          })
          .expect(201)
          .then(({ body }) => {
            const comment = body.comment;
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              body: "Ignore the fruit!",
              review_id: 8,
              author: "mallionaire",
              votes: 0,
              created_at: expect.any(String),
            });
          });
      });
      it("404 POST - responds with msg when sent valid but non-existent path.", () => {
        return request(app)
          .post("/api/reviews/99999999/comments")
          .send({ username: "mallionaire", body: "This is a new comment!" })
          .expect(404)
          .then(({ body }) => {
            const serverResponseMsg = body.msg;
            expect(serverResponseMsg).toBe("Content not found.");
          });
      });

      it("404 POST - responds with msg when sent invalid username.", () => {
        return request(app)
          .post("/api/reviews/10/comments")
          .send({ username: "not_a_username", body: "This is a new comment!" })
          .expect(404)
          .then(({ body }) => {
            const serverResponseMsg = body.msg;
            expect(serverResponseMsg).toBe("Content not found.");
          });
      });

      it("400 POST - invalid review id responds with bad request msg.", () => {
        return request(app)
          .post("/api/reviews/bad-request/comments")
          .send({ username: "mallionaire", body: "This is a new comment!" })
          .expect(400)
          .then(({ body }) => {
            const serverResponseMsg = body.msg;
            expect(serverResponseMsg).toBe("Bad request.");
          });
      });

      it("400 POST - missing fileds responds with bad request msg.", () => {
        return request(app)
          .get("/api/reviews/bad-request")
          .send({ not: "the_correct_field" })
          .expect(400)
          .then(({ body }) => {
            const serverResponseMsg = body.msg;
            expect(serverResponseMsg).toBe("Bad request.");
          });
      });
    });

    describe("GET", () => {
      it("200 GET - responds with an array of comments for the given review_id.", () => {
        return request(app)
          .get("/api/reviews/3/comments")
          .expect(200)
          .then(({ body }) => {
            const comments = body.comments;

            expect(body.comments.length).toBe(3);
            comments.forEach((comment) => {
              expect(comment).toMatchObject({
                comment_id: expect.any(Number),
                body: expect.any(String),
                review_id: expect.any(Number),
                author: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String),
              });
            });
          });
      });

      it("200 GET - comments should be sorted by date in descending order.", () => {
        return request(app)
          .get("/api/reviews/3/comments")
          .expect(200)
          .then(({ body }) => {
            const comments = body.comments;

            const commentDates = comments.map((comment) => {
              return comment.created_at;
            });
            expect(commentDates).toBeSorted({ descending: true });
          });
      });

      it("200 GET - review with no comments should return an empty array.", () => {
        return request(app)
          .get("/api/reviews/8/comments")
          .expect(200)
          .then(({ body }) => {
            const comments = body.comments;

            expect(comments).toEqual([]);
          });
      });

      it("404 GET - responds with msg when sent valid but non-existent path.", () => {
        return request(app)
          .get("/api/reviews/74872/comments")
          .expect(404)
          .then(({ body }) => {
            const serverResponseMsg = body.msg;
            expect(serverResponseMsg).toBe("Content not found.");
          });
      });

      it("400 GET - responds with msg bad request.", () => {
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

  describe("/api/users", () => {
    it("200 GET - responds with array of user objects with correct properties.", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const users = body.users;
          expect(users.length).toBe(4);
          users.forEach((user) => {
            expect(user).toMatchObject({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            });
          });
        });
    });
  });
});

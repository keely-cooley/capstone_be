const express = require("express");
const reviewRouter = express.Router();
const reviewController = require("../controllers/reviewController");
// const review = require("../libraries/reviewLibrary")

// http://localhost:8083/reviews/movie/id/:id
//get all reviews with declared movie id
reviewRouter.get("/movie/id/:id", (req, res) => {
  reviewController.getReviewsByMovieId(req, res);
});

// http://localhost:8083/reviews/user/id/:id
//get all reviews with declared user id
reviewRouter.get("/user/id/:id", (req, res) => {
  reviewController.getReviewsByUserId(req, res);
});

//http://localhost:8083/reviews
//all reviews
reviewRouter.get("/", (req, res) => {
  reviewController.getReviews(req, res);
});

//http://localhost:8083/reviews/:id
//get review by id
reviewRouter.get("/:id", (req, res) => {
  reviewController.getReviewById(req, res);
});

//http://localhost:8083/reviews/new
// create new review
reviewRouter.post("/new", (req, res) => {
  console.log("reviewRouter.review:", req.body);
  reviewController.postReview(req, res);
});

// http://localhost:8083/reviews/update/:id
//update review by id
reviewRouter.put("/update/:id", (req, res) => {
  reviewController.updateReview(req, res);
});

// http://localhost:8083/reviews/delete/:id
//delete review by id
reviewRouter.delete("/delete/:id", (req, res) => {
  reviewController.deleteReview(req, res);
});

module.exports = reviewRouter;

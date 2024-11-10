"use strict";
const Models = require("../models");

// GET all reviews
const getReviews = (req, res) => {
  console.log("reviewController - getReviews");

  Models.Review.findAll()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => {
      console.log("reviewController - getReviews:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET review by ID
const getReviewById = (req, res) => {
  const reviewId = parseInt(req.params.id);
  console.log("reviewController - getReviewById:", req.params);

  Models.Review.findOne({ where: { id: reviewId } })
    .then((review) => {
      if (review) {
        res.status(200).json(review);
      } else {
        res.status(404).json({ result: "Review not found" });
      }
    })
    .catch((err) => {
      console.log("reviewController - getReviewById:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// POST create a new review
const postReview = (req, res) => {
  const { rating, content, userId, movieId } = req.body;
  console.log("reviewController - postReview", req.body);

  if (!rating) {
    return res
      .status(400)
      .json({ result: "Error", message: "All fields are required" });
  }

  Models.Review.create({ rating, content, userId, movieId })
    .then((newReview) => {
      res.status(201).json({
        result: `Review added successfully!`,
        data: newReview,
      });
    })
    .catch((err) => {
      console.log("reviewController - postReview:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to create review. Error: ${err.message}`,
      });
    });
};

// PUT update review by ID
const updateReview = (req, res) => {
  const reviewId = parseInt(req.params.id);
  const { movieTitle, rating, content } = req.body;

  console.log("reviewController - updateReview", req.body);

  if (!rating) {
    return res
      .status(400)
      .json({ result: "Error", message: "All fields are required" });
  }

  Models.Review.update(
    { movieTitle, rating, content },
    { where: { id: reviewId } }
  )
    .then(([affectedRows]) => {
      if (affectedRows > 0) {
        res
          .status(200)
          .json({ result: `Review with ID ${reviewId} updated successfully!` });
      } else {
        res.status(404).json({ result: "Review not found" });
      }
    })
    .catch((err) => {
      console.log("reviewController - updateReview:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to update review. Error: ${err.message}`,
      });
    });
};

// DELETE review by ID
const deleteReview = (req, res) => {
  const reviewId = parseInt(req.params.id);

  console.log("reviewController - deleteReview:", req.params);

  Models.Review.destroy({ where: { id: reviewId } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res
          .status(200)
          .json({ result: `Review with ID ${reviewId} deleted successfully!` });
      } else {
        res.status(404).json({ result: "Review not found" });
      }
    })
    .catch((err) => {
      console.log("reviewController - deleteReview:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to delete review. Error: ${err.message}`,
      });
    });
};

module.exports = {
  getReviews,
  getReviewById,
  postReview,
  updateReview,
  deleteReview,
};

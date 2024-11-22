"use strict";
const Models = require("../models");

// GET all reviews
const getReviews = async (req, res) => {
  console.log("reviewController - getReviews");

  try {
    // wait for all reviews to come in
    const reviews = await Models.Review.findAll();

    // Initialize an array for updated reviews
    let updatedReviews = [];

    // Loop through reviews and fetch user data
    for (const element of reviews) {
      try {
        // Find the user based on userId
        const user = await Models.User.findOne({
          where: { id: element.userId },
        });

        if (user) {
          // Create an updated review with the username
          let updatedReview = {
            ...element.toJSON(), // Convert Sequelize model to plain object
            username: user.username,
          };

          // Push the updated review to the array
          updatedReviews.push(updatedReview);
        } else {
          // If user is not found, return a 404 error and exit
          return res.status(404).json({ result: "User not found" });
        }
      } catch (err) {
        console.log("reviewController - getUserById:", err);
        return res.status(500).json({ result: "Error", error: err.message });
      }
    }

    // Send the updated reviews as a response
    res.status(200).json(updatedReviews);
  } catch (err) {
    console.log("reviewController - getReviews:", err);
    res.status(500).json({ result: "Error", error: err.message });
  }
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

// GET reviews by movie ID
const getReviewsByMovieId = (req, res) => {
  const movieId = parseInt(req.params.id); 

  console.log("reviewController - getReviewsByMovieId:", req.params);

  Models.Review.findAll({
    where: { movieId: movieId } 
  })
    .then((reviews) => {
      if (reviews.length > 0) {
        res.status(200).json(reviews);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((err) => {
      console.log("reviewController - getReviewsByMovieId:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET reviews by user ID
const getReviewsByUserId = (req, res) => {
  const userId = parseInt(req.params.id); 

  console.log("reviewController - getReviewsByUserId:", req.params);

  Models.Review.findAll({
    where: { userId: userId } 
  })
    .then((reviews) => {
      if (reviews.length > 0) {
        res.status(200).json(reviews);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((err) => {
      console.log("reviewController - getReviewsByUserId:", err);
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
  getReviewsByMovieId,
  getReviewsByUserId,
  postReview,
  updateReview,
  deleteReview,
};

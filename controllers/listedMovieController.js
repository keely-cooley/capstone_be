"use strict";
const Models = require("../models");
const { Op } = require('sequelize');

// GET all listedMovies
const getListedMovies = (req, res) => {
  console.log("listedMovieController - getListedMovies");

  Models.ListedMovie.findAll()
    .then((listedMovies) => {
      res.status(200).json(listedMovies);
    })
    .catch((err) => {
      console.log("listedMovieController - getListedMovies:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET listedMovie by ID
const getListedMovieDetailsById = (req, res) => {
  const listedMovieId = parseInt(req.params.id);

  console.log("listedMovieController - getListedMovieDetailsById:", req.params);

  Models.ListedMovie.findOne({ where: { id: listedMovieId } })
    .then((listedMovie) => {
      if (listedMovie) {
        res.status(200).json(listedMovie);
      } else {
        res.status(404).json({ result: "ListedMovie not found" });
      }
    })
    .catch((err) => {
      console.log("listedMovieController - getListedMovieDetailsById:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET listedMovie by userId
const getListedMovieDetailsByUserId = async (req, res) => {
  const listedMovieUserId = parseInt(req.params.id);
  // Validate userId
  if (!listedMovieUserId || isNaN(listedMovieUserId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  console.log(
    "listedMovieController - getListedMovieDetailsByUserId:",
    req.params
  );
  try {
    const listedMovies = await Models.ListedMovie.findAll({
      where: { userId: listedMovieUserId },
    });
    let movieDetails = [];
    for (const element of listedMovies) {
      try {
        const movie = await Models.Movie.findOne({
          where: { id: element.movieId },
        });
        if (movie) {
          movieDetails.push(movie.toJSON());
        }
      } catch (error) {
        console.log("listedMovieController - getMovieById:", error);
        return res.status(500).json({ result: "Error", error: error.message });
      }
    }
    res.status(200).json(movieDetails);
  } catch (error) {
    console.log(
      "listedMovieController - get all listed movies by user id:",
      error
    );
    return res.status(500).json({ result: "Error", error: error.message });
  }
};

// GET listedMovie by title
const getListedMovieDetailsByTitle = (req, res) => {
  const listedMovieTitle = req.params.title;

  console.log(
    "listedMovieController - getListedMovieDetailsByTitle:",
    req.params
  );

  Models.ListedMovie.findOne({ where: { title: listedMovieTitle } })
    .then((listedMovie) => {
      if (listedMovie) {
        res.status(200).json(listedMovie);
      } else {
        res.status(404).json({ result: "ListedMovie not found" });
      }
    })
    .catch((err) => {
      console.log("listedMovieController - getListedMovieDetailsByTitle:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET listedMovies by director
const getListedMovieDetailsByDirector = (req, res) => {
  const listedMovieDirector = req.params.director;

  console.log(
    "listedMovieController - getListedMovieDetailsByDirector:",
    req.params
  );

  Models.ListedMovie.findAll({ where: { director: listedMovieDirector } })
    .then((listedMovies) => {
      if (listedMovies.length > 0) {
        res.status(200).json(listedMovies);
      } else {
        res
          .status(404)
          .json({ result: "No listedMovies found for this director" });
      }
    })
    .catch((err) => {
      console.log(
        "listedMovieController - getListedMovieDetailsByDirector:",
        err
      );
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// POST create a new listedMovie
const createListedMovie = (req, res) => {
  const { userId, movieId } = req.body;

  console.log("listedMovieController - createListedMovie", req.body);

  // validate
  if (!userId || !movieId) {
    return res
      .status(400)
      .json({ result: "Error", message: "All fields are required" });
  }

  // Create new listedMovie
  Models.ListedMovie.create({ userId, movieId })
    .then((newListedMovie) => {
      res.status(201).json({
        result: `ListedMovie added successfully!`,
        data: newListedMovie,
      });
    })
    .catch((err) => {
      console.log("listedMovieController - createListedMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to create listedMovie. Error: ${err.message}`,
      });
    });
};

// PUT update listedMovie by ID
const updateListedMovie = (req, res) => {
  const listedMovieId = parseInt(req.params.id);
  const { userId, movieId } = req.body;

  console.log("listedMovieController - updateListedMovie", req.body);

  // Validate input
  if (!userId || !movieId) {
    return res
      .status(400)
      .json({ result: "Error", message: "All fields are required" });
  }

  // Update listedMovie
  Models.ListedMovie.update(
    { userId, movieId },
    { where: { id: listedMovieId } }
  )
    .then(([affectedRows]) => {
      if (affectedRows > 0) {
        res
          .status(200)
          .json({
            result: `ListedMovie with ID ${listedMovieId} updated successfully!`,
          });
      } else {
        res.status(404).json({ result: "ListedMovie not found" });
      }
    })
    .catch((err) => {
      console.log("listedMovieController - updateListedMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to update listedMovie. Error: ${err.message}`,
      });
    });
};

// DELETE listedMovie by ID
const deleteListedMovie = (req, res) => {
  const listedMovieId = parseInt(req.params.id);

  console.log("listedMovieController - deleteListedMovie:", req.params);

  // Delete listedMovie
  Models.ListedMovie.destroy({ where: { id: listedMovieId } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res
          .status(200)
          .json({
            result: `ListedMovie with ID ${listedMovieId} deleted successfully!`,
          });
      } else {
        res.status(404).json({ result: "ListedMovie not found" });
      }
    })
    .catch((err) => {
      console.log("listedMovieController - deleteListedMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to delete listedMovie. Error: ${err.message}`,
      });
    });
};

// DELETE listedMovie by ID
const deleteListedMovieByUserIdAndMovieId = (req, res) => {
  const userId = parseInt(req.body.userId)
  const movieId = parseInt(req.body.movieId)

  console.log("listedMovieController - deleteListedMovieByUserIdAndMovieId:", req.body);

  // Delete listedMovie
  Models.ListedMovie.destroy({
    where: {
      userId: {
        [Op.eq]: userId,
      },
      movieId: {
        [Op.eq]: movieId,
      },
    },
  })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.status(200).json({
          result: `ListedMovie with ID ${movieId} deleted successfully!`,
        });
      } else {
        res.status(404).json({ result: "ListedMovie not found" });
      }
    })
    .catch((err) => {
      console.log("listedMovieController - deleteListedMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to delete listedMovie. Error: ${err.message}`,
      });
    });
};

module.exports = {
  getListedMovies,
  getListedMovieDetailsById,
  getListedMovieDetailsByUserId,
  getListedMovieDetailsByTitle,
  getListedMovieDetailsByDirector,
  createListedMovie,
  updateListedMovie,
  deleteListedMovie,
  deleteListedMovieByUserIdAndMovieId,
};

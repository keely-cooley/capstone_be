"use strict";
const Models = require("../models");

// GET all seenMovies
const getSeenMovies = (req, res) => {
  console.log("seenMovieController - getSeenMovies");

  Models.SeenMovie.findAll()
    .then((seenMovies) => {
      res.status(200).json(seenMovies);
    })
    .catch((err) => {
      console.log("seenMovieController - getSeenMovies:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET seenMovie by ID
const getSeenMovieDetailsById = (req, res) => {
  const seenMovieId = parseInt(req.params.id);

  console.log("seenMovieController - getSeenMovieDetailsById:", req.params);

  Models.SeenMovie.findOne({ where: { id: seenMovieId } })
    .then((seenMovie) => {
      if (seenMovie) {
        res.status(200).json(seenMovie);
      } else {
        res.status(404).json({ result: "SeenMovie not found" });
      }
    })
    .catch((err) => {
      console.log("seenMovieController - getSeenMovieDetailsById:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET seenMovie by userId
const getSeenMovieDetailsByUserId = async (req, res) => {
  const seenMovieUserId = parseInt(req.params.id);

  console.log("seenMovieController - getSeenMovieDetailsByUserId:", req.params);
  try {
    const seenMovies = await Models.SeenMovie.findAll({
      where: { userId: seenMovieUserId },
    });
    let movieDetails = [];
    for (const element of seenMovies) {
      try {
        const movie = await Models.Movie.findOne({
          where: { id: element.movieId },
        });
        if (movie) {
          movieDetails.push(movie.toJSON());
        }
      } catch (error) {
        console.log("seenMovieController - getMovieById:", error);
        return res.status(500).json({ result: "Error", error: error.message });
      }
    }
    res.status(200).json(movieDetails);
  } catch (error) {
    console.log("seenMovieController - get all seen movies by user id:", error);
    return res.status(500).json({ result: "Error", error: error.message });
  }
};

// GET seenMovie by title
const getSeenMovieDetailsByTitle = (req, res) => {
  const seenMovieTitle = req.params.title;

  console.log("seenMovieController - getSeenMovieDetailsByTitle:", req.params);

  Models.SeenMovie.findOne({ where: { title: seenMovieTitle } })
    .then((seenMovie) => {
      if (seenMovie) {
        res.status(200).json(seenMovie);
      } else {
        res.status(404).json({ result: "SeenMovie not found" });
      }
    })
    .catch((err) => {
      console.log("seenMovieController - getSeenMovieDetailsByTitle:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET seenMovies by director
const getSeenMovieDetailsByDirector = (req, res) => {
  const seenMovieDirector = req.params.director;

  console.log(
    "seenMovieController - getSeenMovieDetailsByDirector:",
    req.params
  );

  Models.SeenMovie.findAll({ where: { director: seenMovieDirector } })
    .then((seenMovies) => {
      if (seenMovies.length > 0) {
        res.status(200).json(seenMovies);
      } else {
        res
          .status(404)
          .json({ result: "No seenMovies found for this director" });
      }
    })
    .catch((err) => {
      console.log("seenMovieController - getSeenMovieDetailsByDirector:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// POST create a new seenMovie
const createSeenMovie = (req, res) => {
  const { userId, movieId } = req.body;

  console.log("seenMovieController - createSeenMovie", req.body);

  // validate
  if (!userId || !movieId) {
    return res
      .status(400)
      .json({ result: "Error", message: "All fields are required" });
  }

  // Create new seenMovie
  Models.SeenMovie.create({ userId, movieId })
    .then((newSeenMovie) => {
      res.status(201).json({
        result: `SeenMovie added successfully!`,
        data: newSeenMovie,
      });
    })
    .catch((err) => {
      console.log("seenMovieController - createSeenMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to create seenMovie. Error: ${err.message}`,
      });
    });
};

// PUT update seenMovie by ID
const updateSeenMovie = (req, res) => {
  const seenMovieId = parseInt(req.params.id);
  const { userId, movieId } = req.body;

  console.log("seenMovieController - updateSeenMovie", req.body);

  // Validate input
  if (!userId || !movieId) {
    return res
      .status(400)
      .json({ result: "Error", message: "All fields are required" });
  }

  // Update seenMovie
  Models.SeenMovie.update({ userId, movieId }, { where: { id: seenMovieId } })
    .then(([affectedRows]) => {
      if (affectedRows > 0) {
        res.status(200).json({
          result: `SeenMovie with ID ${seenMovieId} updated successfully!`,
        });
      } else {
        res.status(404).json({ result: "SeenMovie not found" });
      }
    })
    .catch((err) => {
      console.log("seenMovieController - updateSeenMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to update seenMovie. Error: ${err.message}`,
      });
    });
};

// DELETE seenMovie by ID
const deleteSeenMovie = (req, res) => {
  const seenMovieId = parseInt(req.params.id);

  console.log("seenMovieController - deleteSeenMovie:", req.params);

  // Delete seenMovie
  Models.SeenMovie.destroy({ where: { id: seenMovieId } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.status(200).json({
          result: `SeenMovie with ID ${seenMovieId} deleted successfully!`,
        });
      } else {
        res.status(404).json({ result: "SeenMovie not found" });
      }
    })
    .catch((err) => {
      console.log("seenMovieController - deleteSeenMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to delete seenMovie. Error: ${err.message}`,
      });
    });
};

// DELETE seenMovie by userId and movieId
const deleteSeenMovieByUserIdAndMovieId = (req, res) => {
  const userId = parseInt(req.body.userId);
  const movieId = parseInt(req.body.movieId);

  console.log(
    "listedMovieController - deleteListedMovieByUserIdAndMovieId:",
    req.body
  );

  // Delete listedMovie
  Models.SeenMovie.destroy({
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
          result: `SeenMovie with ID ${movieId} deleted successfully!`,
        });
      } else {
        res.status(404).json({ result: "SeenMovie not found" });
      }
    })
    .catch((err) => {
      console.log("seenMovieController - deleteSeenMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to delete seenMovie. Error: ${err.message}`,
      });
    });
};

module.exports = {
  getSeenMovies,
  getSeenMovieDetailsById,
  getSeenMovieDetailsByUserId,
  getSeenMovieDetailsByTitle,
  getSeenMovieDetailsByDirector,
  createSeenMovie,
  updateSeenMovie,
  deleteSeenMovie,
  deleteSeenMovieByUserIdAndMovieId,
};

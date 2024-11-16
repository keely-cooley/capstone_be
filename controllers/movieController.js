"use strict";
const Models = require("../models");

// GET all movies
const getMovies = (req, res) => {
  console.log("movieController - getMovies");

  Models.Movie.findAll()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.log("movieController - getMovies:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET movie by ID
const getMovieDetailsById = (req, res) => {
  const movieId = parseInt(req.params.id);

  console.log("movieController - getMovieDetailsById:", req.params);

  Models.Movie.findOne({ where: { id: movieId } })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ result: "Movie not found" });
      }
    })
    .catch((err) => {
      console.log("movieController - getMovieDetailsById:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// POST movie by ID, if does not exist add to database
const validateAddMovie = async (req, res) => {
  const id = req.params.id;

  console.log("movieController - validateAddMovie:", id);

  await Models.Movie.findOne({ where: { imdbID: id } })
    .then(async (movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        console.log("adding movie");
        const url = `http://www.omdbapi.com/?i=${id}&apikey=2aa94c15`;

        const response = await fetch(url);
        // convert response to JSON
        const responseJson = await response.json();

        const movieToAdd = { 
          imdbID: responseJson.imdbID,
          title: responseJson.Title,
          year: responseJson.Year,
          genre: responseJson.Genre,
          director: responseJson.Director,
          runtime: responseJson.Runtime,
          img: responseJson.Poster
        }
        console.log(movieToAdd);
    
        await Models.Movie.create(movieToAdd)
          .then((newMovie) => {
            res.status(201).json({
              result: `Movie ${newMovie.title} added successfully!`,
              data: newMovie,
            });
          })
          .catch((err) => {
            console.log("movieController - createMovie:", err);
            res.status(500).json({
              result: "Error",
              error: `Failed to create movie. Error: ${err.message}`,
            });
          });
      
      }
    })
    .catch((err) => {
      console.log("movieController - validateAddMovie:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET movie by title
const getMovieDetailsByTitle = (req, res) => {
  const movieTitle = req.params.title;

  console.log("movieController - getMovieDetailsByTitle:", req.params);

  Models.Movie.findOne({ where: { title: movieTitle } })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ result: "Movie not found" });
      }
    })
    .catch((err) => {
      console.log("movieController - getMovieDetailsByTitle:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// GET movies by director
const getMovieDetailsByDirector = (req, res) => {
  const movieDirector = req.params.director;

  console.log("movieController - getMovieDetailsByDirector:", req.params);

  Models.Movie.findAll({ where: { director: movieDirector } })
    .then((movies) => {
      if (movies.length > 0) {
        res.status(200).json(movies);
      } else {
        res.status(404).json({ result: "No movies found for this director" });
      }
    })
    .catch((err) => {
      console.log("movieController - getMovieDetailsByDirector:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

// POST create a new movie
const createMovie = (req, res) => {
  const { title, imdbID, released, genre, director, duration, img } = req.body;

  console.log("movieController - createMovie", req.body);

  // validate
  if (
    !title ||
    !imdbID ||
    !released ||
    !genre ||
    !director ||
    !duration ||
    !img
  ) {
    return res
      .status(400)
      .json({ result: "Error", message: "All fields are required" });
  }

  // Create new movie
  Models.Movie.create({
    title,
    imdbID,
    released,
    genre,
    director,
    duration,
    img,
  })
    .then((newMovie) => {
      res.status(201).json({
        result: `Movie ${newMovie.title} added successfully!`,
        data: newMovie,
      });
    })
    .catch((err) => {
      console.log("movieController - createMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to create movie. Error: ${err.message}`,
      });
    });
};

// PUT update movie by ID
const updateMovie = (req, res) => {
  const movieId = parseInt(req.params.id);
  const { title, released, genre, director, duration, img } = req.body;

  console.log("movieController - updateMovie", req.body);

  // Validate input
  if (!title || !released || !genre || !director || !duration || !img) {
    return res
      .status(400)
      .json({ result: "Error", message: "All fields are required" });
  }

  // Update movie
  Models.Movie.update(
    { title, released, genre, director, duration, img },
    { where: { id: movieId } }
  )
    .then(([affectedRows]) => {
      if (affectedRows > 0) {
        res
          .status(200)
          .json({ result: `Movie with ID ${movieId} updated successfully!` });
      } else {
        res.status(404).json({ result: "Movie not found" });
      }
    })
    .catch((err) => {
      console.log("movieController - updateMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to update movie. Error: ${err.message}`,
      });
    });
};

// DELETE movie by ID
const deleteMovie = (req, res) => {
  const movieId = parseInt(req.params.id);

  console.log("movieController - deleteMovie:", req.params);

  // Delete movie
  Models.Movie.destroy({ where: { id: movieId } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res
          .status(200)
          .json({ result: `Movie with ID ${movieId} deleted successfully!` });
      } else {
        res.status(404).json({ result: "Movie not found" });
      }
    })
    .catch((err) => {
      console.log("movieController - deleteMovie:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to delete movie. Error: ${err.message}`,
      });
    });
};

module.exports = {
  getMovies,
  getMovieDetailsById,
  validateAddMovie,
  getMovieDetailsByTitle,
  getMovieDetailsByDirector,
  createMovie,
  updateMovie,
  deleteMovie,
};

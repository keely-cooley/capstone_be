const express = require("express");
const movieRouter = express.Router();
const Controllers = require("../controllers");

// GET all movies
// GET http://localhost:8083/movies
movieRouter.get("/", (req, res) => {
  Controllers.movieController.getMovies(req, res);
});

// GET movie by ID
// GET http://localhost:8083/movies/:id
movieRouter.get("/:id", (req, res) => {
  Controllers.movieController.getMovieDetailsById(req, res);
});

// GET movie by Id, if does not exist add to database
//GET http://localhost:8083/movies/validate/:id
movieRouter.get("/validate/:id", (req, res) => {
  Controllers.movieController.validateAddMovie(req, res);
});

// GET movie by title
// GET http://localhost:8083/movies/title/:title
movieRouter.get("/title/:title", (req, res) => {
  Controllers.movieController.getMovieDetailsByTitle(req, res);
});

// GET movies by director
// GET http://localhost:8083/movies/director/:director
movieRouter.get("/director/:director", (req, res) => {
  Controllers.movieController.getMovieDetailsByDirector(req, res);
});

// POST create a new movie
// POST http://localhost:8083/movies
movieRouter.post("/", (req, res) => {
  Controllers.movieController.createMovie(req, res);
});

// PUT update movie by ID
// PUT http://localhost:8083/movies/:id
movieRouter.put("/:id", (req, res) => {
  Controllers.movieController.updateMovie(req, res);
});

// DELETE movie by ID
// DELETE http://localhost:8083/movies/:id
movieRouter.delete("/:id", (req, res) => {
  Controllers.movieController.deleteMovie(req, res);
});

module.exports = movieRouter;

const express = require("express");
const seenMovieRouter = express.Router();
const Controllers = require("../controllers");

// GET all seenMovies
// GET http://localhost:8083/seenMovies
seenMovieRouter.get("/", (req, res) => {
  Controllers.seenMovieController.getSeenMovies(req, res);
});

// GET seenMovie by ID
// GET http://localhost:8083/seenMovies/:id
seenMovieRouter.get("/:id", (req, res) => {
  Controllers.seenMovieController.getSeenMovieDetailsById(req, res);
});

// GET seenMovie by user ID
// GET http://localhost:8083/seenMovies/user/:id
seenMovieRouter.get("/user/:id", (req, res) => {
  Controllers.seenMovieController.getSeenMovieDetailsByUserId(req, res);
});

// GET seenMovie by title
// GET http://localhost:8083/seenMovies/title/:title
seenMovieRouter.get("/title/:title", (req, res) => {
  Controllers.seenMovieController.getSeenMovieDetailsByTitle(req, res);
});

// GET seenMovies by director
// GET http://localhost:8083/seenMovies/director/:director
seenMovieRouter.get("/director/:director", (req, res) => {
  Controllers.seenMovieController.getSeenMovieDetailsByDirector(req, res);
});

// POST create a new seenMovie
// POST http://localhost:8083/seenMovies
seenMovieRouter.post("/", (req, res) => {
  Controllers.seenMovieController.createSeenMovie(req, res);
});

// PUT update seenMovie by ID
// PUT http://localhost:8083/seenMovies/:id
seenMovieRouter.put("/:id", (req, res) => {
  Controllers.seenMovieController.updateSeenMovie(req, res);
});

// DELETE seenMovie by ID
// DELETE http://localhost:8083/seenMovies/:id
seenMovieRouter.delete("/:id", (req, res) => {
  Controllers.seenMovieController.deleteSeenMovie(req, res);
});

module.exports = seenMovieRouter;

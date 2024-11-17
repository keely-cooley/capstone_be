const express = require("express");
const listedMovieRouter = express.Router();
const Controllers = require("../controllers");

// GET all listedMovies
// GET http://localhost:8083/listedMovies
listedMovieRouter.get("/", (req, res) => {
  Controllers.listedMovieController.getListedMovies(req, res);
});

// GET listedMovie by ID
// GET http://localhost:8083/listedMovies/:id
listedMovieRouter.get("/:id", (req, res) => {
  Controllers.listedMovieController.getListedMovieDetailsById(req, res);
});

// GET listedMovie by user ID
// GET http://localhost:8083/listedMovies/user/:id
listedMovieRouter.get("/user/:id", (req, res) => {
  Controllers.listedMovieController.getListedMovieDetailsByUserId(req, res);
});

// GET listedMovie by title
// GET http://localhost:8083/listedMovies/title/:title
listedMovieRouter.get("/title/:title", (req, res) => {
  Controllers.listedMovieController.getListedMovieDetailsByTitle(req, res);
});

// GET listedMovies by director
// GET http://localhost:8083/listedMovies/director/:director
listedMovieRouter.get("/director/:director", (req, res) => {
  Controllers.listedMovieController.getListedMovieDetailsByDirector(req, res);
});

// POST create a new listedMovie
// POST http://localhost:8083/listedMovies
listedMovieRouter.post("/", (req, res) => {
  Controllers.listedMovieController.createListedMovie(req, res);
});

// PUT update listedMovie by ID
// PUT http://localhost:8083/listedMovies/:id
listedMovieRouter.put("/:id", (req, res) => {
  Controllers.listedMovieController.updateListedMovie(req, res);
});

// DELETE listedMovie by ID
// DELETE http://localhost:8083/listedMovies/:id
listedMovieRouter.delete("/:id", (req, res) => {
  Controllers.listedMovieController.deleteListedMovie(req, res);
});

module.exports = listedMovieRouter;

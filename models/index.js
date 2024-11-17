"use strict";

//import models
const User = require("./user");
const Movie = require("./movie");
const Review = require("./review");
const ListedMovie = require("./listedMovie");
const SeenMovie = require("./seenMovie");

async function init() {
  //sync models with database
  await User.sync();
  await Movie.sync();
  await Review.sync();
  await ListedMovie.sync();
  await SeenMovie.sync();
}

//FOREIGN KEYS
Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Movie);
Movie.hasMany(Review);

ListedMovie.belongsTo(User);
User.hasMany(ListedMovie);

ListedMovie.belongsTo(Movie);
Movie.hasMany(ListedMovie);

SeenMovie.belongsTo(User);
User.hasMany(SeenMovie);

SeenMovie.belongsTo(Movie);
Movie.hasMany(SeenMovie);

init();

module.exports = {
  User,
  Movie,
  Review,
  ListedMovie,
  SeenMovie,
};

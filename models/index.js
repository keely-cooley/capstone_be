'use strict'

//import models
const User = require('./user')
const Movie = require('./movie')
const Review = require('./review')
const ListedMovie = require('./listedMovie')

async function init() {
    //sync models with database
    await User.sync();
    await Movie.sync();
    await Review.sync()
    await ListedMovie.sync()
};

//FOREIGN KEYS
Review.belongsTo(User); 
User.hasMany(Review) 

Review.belongsTo(Movie);
Movie.hasMany(Review) 

ListedMovie.belongsTo(User); 
User.hasMany(ListedMovie) 

ListedMovie.belongsTo(Movie);
Movie.hasMany(ListedMovie) 


init();

module.exports = {
    User,
    Movie,
    Review,
    ListedMovie
}
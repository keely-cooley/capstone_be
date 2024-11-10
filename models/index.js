'use strict'

//import models
const User = require('./user')
const Movie = require('./movie')
const Review = require('./review')

async function init() {
    //sync models with database
    await User.sync();
    await Movie.sync();
    await Review.sync()
};

//FOREIGN KEYS
Review.belongsTo(User); 
User.hasMany(Review) 

Review.belongsTo(Movie);
Movie.hasMany(Review) 

init();

module.exports = {
    User,
    Movie,
    Review
}
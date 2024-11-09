'use strict'

const User = require('./user')
const Movie = require('./movie')

async function init() {
    await User.sync();
    await Movie.sync()
};

init();

module.exports = {
    User,
    Movie
}
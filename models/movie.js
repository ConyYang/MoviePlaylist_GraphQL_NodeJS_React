const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    // add properties we expect on a movie
    name: String,
    genre: String,
    author: String
});

module.exports = mongoose.model('Movie',movieSchema);


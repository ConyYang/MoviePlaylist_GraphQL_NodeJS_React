const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    // add properties we expect on a movie
    name: String,
    age: Number,
});

module.exports = mongoose.model('Author',authorSchema);
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    MovieID: { type: String, required: true, unique: true }
});


module.exports = mongoose.model('Movie', movieSchema);;
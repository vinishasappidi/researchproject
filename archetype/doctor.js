/* Doctor Schema */

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    category: String,
    workhours: String
});

module.exports = mongoose.model('doctors',Schema);
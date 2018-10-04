/* Appointments Model/Schema */ 

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    address: String,
    mobile: Number,
    problem: String,
    category: String,
    doctor: String,
    timeslot: String
});

module.exports = mongoose.model('appointments',Schema);

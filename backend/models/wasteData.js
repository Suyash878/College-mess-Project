
const mongoose = require('mongoose');

const WasteDataSchema = new mongoose.Schema({
    date: String,
    breakfast: Number,
    lunch: Number,
    snacks: Number,
    dinner: Number
});

module.exports = mongoose.model('WasteData', WasteDataSchema);
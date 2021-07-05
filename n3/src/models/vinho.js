//acidity,citric acid,residual sugar, ph e quality
const mongoose = require('mongoose');

const vinhoSchema = new mongoose.Schema({
    acidity: { type: String }, 
    citric_acid: { type: String },
    residual_sugar: { type: String},
    ph: { type: String},
    quality: { type: String}
})

module.exports = mongoose.model('Vinho', vinhoSchema)
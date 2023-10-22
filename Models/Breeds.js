let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BreedsSchema = new Schema({
    name : {
        type : String,
    },
    weight : {
        type : String,
    },
    height : {
        type : String,
    },
    breed_group : {
        type : String,
    },
    life_span : {
        type : String
    },
    temperament : {
        type : String
    },
    image : {
        type : String,
    }
})

module.exports = mongoose.model('Breed',BreedsSchema);
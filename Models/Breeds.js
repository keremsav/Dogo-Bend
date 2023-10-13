let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BreedsSchema = new Schema({
    name : {
        type : String,
        unique  :true
    },

})
let mongoose = require('mongoose');
let moment = require('moment');
let Schema = mongoose.Schema;
let uuid = require('uuid');

let dogSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : String,
        required : true
    },
    id : {
        type : String,
    },
    weight : Number,
    createdAt : String,
    breed :[{type : Schema.ObjectId, ref : 'Breed'}],
})



module.exports = mongoose.model('Dogs',dogSchema);
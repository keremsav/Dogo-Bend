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
        unique: true,
    },
    weight : Number,
    createdAt : String,
    breed :[{type : Schema.ObjectId, ref : 'Breed'}],
})

dogSchema.pre('save', async (next) => {
    this.id = uuid.v4();
    this.createdAt = moment().unix();
    next();
});

module.exports = mongoose.model('Dogs',dogSchema);
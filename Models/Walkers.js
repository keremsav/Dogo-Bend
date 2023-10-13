let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');
let uuid =  require('uuid');


let walkersSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    id : String,
    email  : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : String,
        required : true
    },
    rating : Number,
    createdAt : String,
});

walkersSchema.pre('save', async (next) => {
    this.id = uuid.v4();
    this.createdAt = moment().unix();
    next();
});


module.exports = mongoose.model('Walkers',walkersSchema);
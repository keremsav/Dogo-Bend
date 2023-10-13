let mongoose = require('mongoose');
let moment = require('moment');
let Schema = mongoose.Schema;
let {v4 : uuid} = require('uuid');

let userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    birthDate : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        unique: true
    },
    id : String,
    createdAt : String,
    dogs : [{type: Schema.ObjectId, ref : 'Dogs'}],

})

userSchema.pre('save', function (next) {
    this.id = uuid();
    this.createdAt = moment().unix();
    next();
});

module.exports = mongoose.model('Users',userSchema);
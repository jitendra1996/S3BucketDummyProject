const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accessToken:{
        type:String,
    }
},{timestamps:true});

module.exports = mongoose.model('User', UserSchema);
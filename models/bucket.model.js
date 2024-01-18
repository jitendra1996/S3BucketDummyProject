const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BucketSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    bucketName:{
        type:String,
        required: true
    },
    bucketPath:{
        type:String,
        unique:true,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Bucket', BucketSchema);
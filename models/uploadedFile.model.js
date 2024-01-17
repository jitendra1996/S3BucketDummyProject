const mongoose = require('mongoose');

const { Schema } = mongoose;

const UploadedFileSchema = new Schema({
    filename : {
        type:String,
        required:true
    },
    mimetype:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    },
    bucketId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Bucket'
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps: true});

module.exports = mongoose.model('UploadedFile',UploadedFileSchema);
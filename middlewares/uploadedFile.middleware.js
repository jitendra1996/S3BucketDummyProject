const fs = require('fs');
const path = require('path');
const multer = require('multer');

const Bucket = require('../models/bucket.model');
const UploadedFile = require('../models/uploadedFile.model');

/**
 * Function: uploadFile
 * Description: This function returns a multer middleware for uploading files.
 * 
 * @returns {Function} The multer middleware for uploading files.
 */
exports.uploadFile = () => {
    return fileUpload = multer({
        storage: multer.diskStorage({
            destination: (req,file,cb) => {
                const bucketName = req.query.bucketName;
                const bucketPath = path.join('buckets',`${bucketName}-${req.session.user.id}/`);
                fs.mkdirSync(bucketPath,{recursive: true});
                cb(null,bucketPath);
            },
            filename:(req,file,cb) =>{
                cb(null,Date.now()+ path.extname(file.originalname));
            }
        }),
        fileFilter:(req,file,cb)=>{
            cb(null,true);
        }
    });
} 


/**
 * Handles errors that occur during file uploads.
 * @param {Error} err - The error object that occurred during the file upload.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object with appropriate status code and message.
 */
exports.fileUploadErrorHandling = (err, req, res, next) => {
  try {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status: 400, message: 'Multer error: ' + err.message, success: false });
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message, success: false });
  }
}

/**
 * Checks if a given bucket exists.
 * @param {object} req - The request object containing the bucket name in the query parameters.
 * @param {object} res - The response object used to send JSON responses.
 * @param {function} next - The next function to be called to proceed with the next middleware.
 * @returns {Promise<void>} - A promise that resolves when the function is done.
 */
exports.isGivenBucketExist = async (req, res, next) => {
  try {
    const bucketName = req.query.bucketName;

    if (!bucketName) {
      return res.status(400).json({ status: 400, message: 'Invalid bucket name', success: false });
    }

    const bucketPath = path.join('buckets', `${bucketName}-${req.session.user.id}`);
    const bucketExist = await Bucket.findOne({ bucketPath });

    if (!bucketExist) {
      return res.status(404).json({ status: 404, message: 'Bucket not found', success: false });
    }

    req.session.bucketId = bucketExist.id;
    req.session.save((err) => {
      if (err) {
        console.log('Error saving session:', err);
      }
    });

    next();
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message, success: false });
  }
};


/**
 * Checks if a file exists in the database.
 * @param {object} req - The request object containing the query parameters.
 * @param {object} res - The response object used to send the HTTP response.
 * @param {function} next - The next middleware function to be called.
 * @returns {Promise<void>} - A Promise that resolves when the function is done.
 */
exports.isFileExist = async (req, res, next) => {
  try {
    const { filename, id: fileId } = req.query;

    if (!filename) {
      return res.status(400).json({ status: 400, message: 'File not found', success: false });
    }

    if (!fileId) {
      return res.status(400).json({ status: 400, message: 'File id is not valid', success: false });
    }

    const fileData = await UploadedFile.findOne({ _id: fileId });

    if (!fileData) {
      return res.status(400).json({ status: 400, message: 'File not found', success: false });
    }

    req.session.file = {
      id: fileData.id,
      filename: fileData.filename,
      filePath: fileData.filepath
    };

    req.session.save((err) => {
      if (err) {
        console.log('Error saving session:', err);
      }
    });

    next();
  } catch (error) {
    console.log('Error in isFileExist:', error);
  }
};
const UploadedFile = require('../models/uploadedFile.model');
const {storeFileDetailsInDB,modifyFileDetailsObject} = require("../utils/uploadedFile.util");
const fs = require("fs");

/**
 * Handles the uploading of a file.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The HTTP response object.
 */
exports.postUploadedFile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 400, message: "Error uploading file", success: false });
    }
    const bucketId = req.session.bucketId;
    const userId = req.session.user.id;
    storeFileDetailsInDB(userId,bucketId,req.file);

    delete req.session.bucketId;
    req.session.save();

    return res
      .status(200)
      .json({ status: 200, message: "Uploaded file successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Error uploading file", success: false });
  }
};


/**
 * Retrieves all uploaded files from the database and returns them as a JSON response.
 * Populates the `bucketId` and `userId` fields of each file object.
 * 
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns {Object} - JSON response object with status, message, success, and filesList properties.
 */
exports.getAllUploadedFiles=async (req,res)=>{
    try {
        const uploadedFiles = await UploadedFile.find().populate('bucketId').populate('userId').exec();
        if(!uploadedFiles){
          return res.status(500).json({ status: 500, message: "Files not found", success: false });
        }
        return res.status(200).json({status:200,message:"Found list of all files",success:true,filesList:modifyFileDetailsObject(uploadedFiles)});
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Files not found", success: false });
    }
}

/**
 * Retrieves a list of uploaded files for a particular user.
 * @param {Object} req - The request object containing information about the user.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {Object} - The response object with the file details.
 */
exports.getParticularUserFiles = async (req,res) => {
    try {
        const uploadedFiles = await UploadedFile.find({userId:req.session.user.id}).populate('bucketId').populate('userId').exec();
        if(!uploadedFiles){
          return res.status(500).json({ status: 500, message: "Files not found", success: false });
        }
        return res.status(200).json({status:200,message:"Found list of all files",success:true,filesList:modifyFileDetailsObject(uploadedFiles)});
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Files not found", success: false });
    }
}

/**
 * Downloads a file from the server.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 * @throws {Error} - If there is an error during the file download process.
 */
exports.getDownloadFile = (req,res) => {
    try {
        res.setHeader('Content-Disposition',`attachment; filename=${req.query.filename}`);
        const fileStream = fs.createReadStream(req.session.file.filePath);
        
        delete req.session.file;
        req.session.save();

        fileStream.pipe(res);
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message, success: false });     
    }
}


/**
 * Deletes an uploaded file from the database and file system.
 * @param {Object} req - The request object containing information about the file to be deleted.
 * @param {Object} res - The response object used to send the status and response data.
 * @returns {Object} - The response object with the appropriate status and message.
 */
exports.deleteUploadedFile = async (req, res) => {
  try {
    const deletedFile = await UploadedFile.findByIdAndDelete(req.session.file.id);
    if (!deletedFile) {
      return res.status(400).json({ status: 400, message: "File not deleted", success: false });
    }
    fs.unlink(req.session.file.filePath, (err) => {
      if (err) {
        console.log("🚀 ~ fs.unlink ~ err:", err);
        return res.status(404).json({ status: 404, message: err.message, success: false });
      }
    });

    delete req.session.file;
    req.session.save();
        
    return res.status(200).json({ status: 200, message: "File Deleted Successfully", success: true });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message, success: false });
  }
};
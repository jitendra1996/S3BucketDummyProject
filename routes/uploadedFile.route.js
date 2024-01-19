const router = require('express').Router();

// Authenticated middleware
const { isUserAuthorized } = require('../middlewares/user.middleware');
const { uploadFile , fileUploadErrorHandling,isGivenBucketExist,isFileExist} = require('../middlewares/uploadedFile.middleware');

// uploaded file controllers import 
const {postUploadedFile,getParticularUserFiles,getAllUploadedFiles,getDownloadFile,deleteUploadedFile} = require('../controllers/uploadedFile.controller');

router.post('/uploadFile',isUserAuthorized,isGivenBucketExist,uploadFile().single('file'),fileUploadErrorHandling,postUploadedFile);

router.get('/uploadFile',isUserAuthorized,getParticularUserFiles);

router.get('/getAllUploadedFiles',getAllUploadedFiles);

router.get('/downloadFile',isUserAuthorized,isGivenBucketExist,isFileExist,getDownloadFile);

router.delete('/deleteUploadedFile',isUserAuthorized,isGivenBucketExist,isFileExist,deleteUploadedFile);

module.exports = router;
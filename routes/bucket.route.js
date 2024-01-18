const router = require('express').Router();

// Bucket controller imports
const {postCreateBucket,getParticularUserBucketsList,getListOfAllBuckets} = require('../controllers/bucket.controller');

// Middleware imports
const {isUserAuthorized} = require('../middlewares/user.middleware');
const {isBucketAlreadyExists} = require('../middlewares/bucket.middleware'); 


router.post('/createBucket',isUserAuthorized,isBucketAlreadyExists,postCreateBucket);

router.get('/bucket-list',isUserAuthorized,getParticularUserBucketsList);

router.get('/getAllBucketList',getListOfAllBuckets);

module.exports = router
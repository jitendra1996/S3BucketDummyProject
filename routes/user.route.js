const router = require('express').Router();

// import middlewares
const {isUserExist,isEmailExist,isUserAuthorized} = require('../middlewares/user.middleware');

// import controllers
const {postLoggedInSuccessfully,postSignUpSuccessfully,getLogoutSuccessfully} =require('../controllers/user.controller');

/**
 * Route handler for the '/login' endpoint using the POST method.
 */
router.post('/login',isUserExist,postLoggedInSuccessfully);

/**
 * Route handler for the '/signup' endpoint using the POST method.
 */
router.post('/signup',isEmailExist,postSignUpSuccessfully);

/**
 * Route handler for the '/logout' endpoint using the GET method.
 */
router.get('/logout',isUserAuthorized,getLogoutSuccessfully);

module.exports = router; 
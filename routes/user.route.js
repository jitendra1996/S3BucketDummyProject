const router = require('express').Router();

// import middlewares
const {isUserExist,isEmailExist} = require('../middlewares/user.middleware');

// import controllers
const {postLoggedInSuccessfully} =require('../controllers/user.controller');

router.post('/login',isUserExist,postLoggedInSuccessfully);

router.post('/signup',isEmailExist,(req,res)=>{
   


});

module.exports = router; 
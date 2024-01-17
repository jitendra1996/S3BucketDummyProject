const router = require('express').Router();

// 404 controllers import
const {get404Page} = require("../controllers/404.controller");

router.get('*',get404Page);

module.exports = router;
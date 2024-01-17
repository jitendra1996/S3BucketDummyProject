const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// All routes import
const errorPageRoutes = require('./routes/404.route');

const app = express();

app.use(
    cors({
      origin: `${process.env.ORIGIN_ACCESS_URL}`,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
  );
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.json({status: 200, message:'user successfully logged in',user:{id:1,name: 'John',lastname: 'Smith',age:25}});
});

app.use(errorPageRoutes);

module.exports = app;
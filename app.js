const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// All routes import
const userRouter = require('./routes/user.route');
const bucketRouter = require('./routes/bucket.route');
const errorPageRoutes = require('./routes/404.route');

// All utils import
const {initiateSession}= require('./utils/session.util');

const app = express();

app.use(
    cors({
      origin: process.env.ORIGIN_ACCESS_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
  );
app.use(bodyParser.json());

// start session storage
app.use(initiateSession());

// user GET,POST,PUT routes
app.use(userRouter);

// bucket GET,POST,PUT routes
app.use(bucketRouter);

// 404 page routes
app.use(errorPageRoutes);

module.exports = app;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

/**
 * Creates a new instance of MongoDBStore.
 * 
 * @param {Object} options - The options for configuring the MongoDBStore instance.
 * @param {string} options.uri - The URI of the MongoDB database for storing sessions.
 * @param {string} options.collection - The name of the collection in the MongoDB database for storing sessions.
 * @returns {MongoDBStore} A new instance of MongoDBStore.
 */
const store = new MongoDBStore({
    uri: process.env.SESSION_DB_URI,
    collection: process.env.SESSION_COLLECTION_NAME
});

/**
 * Initializes a session middleware for Express.js.
 *
 * @returns {Function} The session middleware function.
 *
 * @description
 * This function creates and returns a session middleware function for Express.js.
 * The session middleware is responsible for managing user sessions and storing session data.
 * It uses the 'express-session' package and requires a MongoDBStore instance to be passed as the 'store' option.
 * The 'secret' option should be set to a secret key for session encryption.
 * The 'resave' option determines whether the session should be saved to the store on every request.
 * The 'saveUninitialized' option determines whether a new session should be created for each request.
 *
 */
exports.initiateSession = () => session({
    secret:process.env.SESSION_SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    store:store
});


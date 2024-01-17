const app = require('./app');
require('dotenv').config();

const mongooseConnect = require('./utils/db');

/**
 * This function starts a server using the Express app. It retrieves the port and database path from environment variables,
 * checks their validity, and then connects to the database using the `mongooseConnect` function. Finally, it starts the server
 * and logs a message indicating the port it is listening on.
 */
const startServer = () => {
  const port = process.env.PORT;
  const dbPath = process.env.DB_PATH;

  // Check if the `PORT` is valid and not empty
  if (!port || isNaN(port)) {
    console.error('Invalid PORT environment variable');
    return;
  }

  // Check if the `DB_PATH` is not empty
  if (!dbPath) {
    console.error('DB_PATH environment variable is not set');
    return;
  }

  // Connect to the database using the `mongooseConnect` function
  mongooseConnect(() => {
    try {
      // Start the server using the `app.listen` method and log a message indicating the port it is listening on
      app.listen(port, () => {
        console.info(`server is listening on ${port}`);
      });
    } catch (error) {
      console.error(error);
    }
  }, dbPath);
};

startServer();
/**
 * Handles a request for a non-existent page.
 * Returns a JSON response with a status code of 404 and a message indicating that the page was not found.
 * If an error occurs during the execution of the function, it logs the error and returns a JSON response 
 * with a status code of 500 and a message indicating an internal server error.
 * @param {object} req - The request object containing information about the HTTP request.
 * @param {object} res - The response object used to send the HTTP response.
 */
exports.get404Page = (req, res) => {
  try {
    res.status(404).json({ status: 404, message: "Page not found", success: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error", success: false });
  }
};
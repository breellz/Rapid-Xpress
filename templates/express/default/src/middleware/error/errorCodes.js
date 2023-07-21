module.exports = {
  INVALID_EMAIL_OR_PASSWORD: {
    statusCode: 400, // Bad Request
    message: "Invalid email address or password",
  },
  USER_NOT_FOUND: {
    statusCode: 404, // Not Found
    message: "User not found",
  },
  INVALID_UPDATES: {
    statusCode: 400, // Bad Request
    message:
      "update type not allowed, only name,password and age can be updated",
  },
  INTERNAL_ERROR: {
    statusCode: 500, // Internal Server Error
    message: "Internal Server Error",
  },
};

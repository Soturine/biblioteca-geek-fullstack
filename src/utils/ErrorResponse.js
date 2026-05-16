class ErrorResponse extends Error {
  constructor(message, statusCode = 500, errors = null) {
    super(message);
    this.name = 'ErrorResponse';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

module.exports = ErrorResponse;

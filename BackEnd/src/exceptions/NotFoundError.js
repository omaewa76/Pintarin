// src/exceptions/NotFoundError.js

const ClientError = require('./ClientError');

// Kelas error untuk resource yang tidak ditemukan (404 Not Found)
class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
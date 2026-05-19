// src/exceptions/ServerError.js

const ClientError = require('./ClientError');

// Kelas error untuk kesalahan server (500 Internal Server Error)
class ServerError extends ClientError {
  constructor(message) {
    super(message, 500);
    this.name = 'ServerError';
  }
}

module.exports = ServerError;
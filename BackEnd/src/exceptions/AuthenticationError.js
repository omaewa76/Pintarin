// src/exceptions/AuthenticationError.js

const ClientError = require('./ClientError');

// Kelas error untuk autentikasi yang gagal (401 Unauthorized)
class AuthenticationError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

module.exports = AuthenticationError;
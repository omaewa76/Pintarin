// src/exceptions/InvariantError.js

const ClientError = require('./ClientError');

// Kelas error untuk validasi yang gagal (400 Bad Request)
class InvariantError extends ClientError {
  constructor(message) {
    super(message, 400);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
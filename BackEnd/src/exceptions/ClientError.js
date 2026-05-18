// src/exceptions/ClientError.js

// Kelas error dasar untuk kesalahan yang disebabkan oleh klien (4xx)
class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

module.exports = ClientError;
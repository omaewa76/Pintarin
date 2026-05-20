const HOST = process.env.HOST;
const PORT = process.env.PORT;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const RANDOM_LENGTH = process.env.RANDOM_LENGTH;
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;

module.exports = {
    HOST,
    PORT,
    SALT_ROUNDS,
    RANDOM_LENGTH,
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY
};
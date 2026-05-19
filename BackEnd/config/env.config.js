const accesstoken = process.env.ACCESS_TOKEN_SECRET;
const refreshtoken = process.env.REFRESH_TOKEN_SECRET;
const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT) || 3000;

module.exports = {
    ACCESS_TOKEN_SECRET: accesstoken,
    REFRESH_TOKEN_SECRET: refreshtoken,
    HOST: host,
    PORT: port,
};
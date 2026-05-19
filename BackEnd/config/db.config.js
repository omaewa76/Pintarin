module.export = {
    USER: process.env.PGUSER,
    HOST: process.env.PGHOST,
    DB: process.env.PGDATABASE,
    PASSWD: process.env.PGPASSWORD,
    PORT: process.env.PGPORT,
    POOL: {
        max: 3,
        min: 0,
        acquire: 10000,
        idle: 10000
    }
};
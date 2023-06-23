const { config } = require('dotenv')
config();  // load .env file into process.env object

exports.DB = {
    // Postgres DB
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || "gharbikri",
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
    DB_HOST: process.env.DB_HOST || "localhost",
}

exports.SERVER = {
    SERVER_PORT: process.env.SERVER_PORT || 5000,
}

exports.JWT = {
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
}
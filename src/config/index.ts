import dotenv from 'dotenv';

const dbConfig  = require('./database');
dotenv.config();

export default {
    port: dbConfig.development.port,
    dbUrl: dbConfig.development.url
};

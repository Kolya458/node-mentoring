import dotenv from 'dotenv';
const config = require('./database');
dotenv.config();

export default {
    port: config.development.port,
    dbUrl: config.development.url,
    jwtSecret: config.development.jwtSecret || 'shhh',
    jwtLifetime: config.development.jwtLifetime
};

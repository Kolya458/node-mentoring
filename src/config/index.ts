import dotenv from 'dotenv';
import jwt from './jwt';
const database = require('./database');
dotenv.config();

export default {
    port: database.development.port,
    dbUrl: database.development.url,
    jwtSecret: jwt.development.jwtSecret || 'shhh',
    jwtLifetime: jwt.development.jwtLifetime
};

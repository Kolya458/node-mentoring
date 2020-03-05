import dotenv from 'dotenv';

const dbConfig  = require('./database');

dotenv.config({ path: './src/config/.env' });

export default {
    server: {
        port: process.env.PORT || 5000
    },
    db: dbConfig.development
};

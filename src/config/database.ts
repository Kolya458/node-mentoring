const dotenv = require('dotenv');

dotenv.config({ path: './src/config/.env' });

module.exports = {
    development: {
        url: process.env.DB_URL || ''
    }
};

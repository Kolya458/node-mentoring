const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
    development: {
        url: process.env.DB_URL || '',
        port: process.env.PORT || 5000
    }
};

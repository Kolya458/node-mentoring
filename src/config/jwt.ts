
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const config = {
    development: {
        jwtSecret: process.env.JWT_SECRET,
        jwtLifetime: '10m'
    }
};

export default config;

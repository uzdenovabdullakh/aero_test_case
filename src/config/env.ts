
import dotenv from "dotenv";
dotenv.config();

const env = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'erp_aero',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || '',
    APP_PORT: process.env.APP_PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
};

export default env;
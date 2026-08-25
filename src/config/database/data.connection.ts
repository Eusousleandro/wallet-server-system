import 'dotenv/config';
import mysql from 'mysql2';

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create MySQL connection function
const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'vue_user',
    password: process.env.DB_PASSWORD || 'vue_password',
    database: process.env.DB_NAME || 'vue_app',
  });
  return connection;
};

// Create Drizzle instance
let db;
let connection;

const initializeDatabase = async () => {
  try {
    connection = await createConnection();
    db = drizzle(connection);
    console.log('Database connected successfully');
    return { db, connection };
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export { db, connection, initializeDatabase };
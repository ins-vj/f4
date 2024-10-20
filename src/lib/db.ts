// src/lib/db.ts
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',       // Your MySQL host
  user: 'root',            // Your MySQL username
  password: '124106',            // Your MySQL password
  database: 'user_auth'    // Your database name
});

export default db;

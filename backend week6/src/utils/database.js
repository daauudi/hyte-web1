import mysql from 'mysql2';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Lisää tämä rivi:
  authPlugins: {
    mysql_native_password: () => () => Buffer.from(process.env.DB_PASSWORD + '\0')
  }
});
const promisePool = pool.promise();
export default promisePool;
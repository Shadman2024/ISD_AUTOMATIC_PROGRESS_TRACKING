const dns = require('dns');
// dns.setDefaultResultOrder('ipv4first');

const { Pool } = require('pg');
const dotenv = require('dotenv');
// const dns = require('dns');

dotenv.config();

const useSsl = process.env.PGSSLMODE === 'require' || process.env.DB_SSL === 'true';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSsl
    ? {
        rejectUnauthorized: false,
      }
    : false,
  family: 4
});

pool.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connected successfully!');
    }
});

module.exports = pool;

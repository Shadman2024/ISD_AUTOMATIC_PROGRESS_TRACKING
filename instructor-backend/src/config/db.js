const { Pool } = require('pg');
require('dotenv').config();

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

pool.connect((err)=>{
  if(err){
    console.log("an error occured while connection to database"+err);
  }
  else{
    console.log("the connection to database was successful");
  }
});


module.exports = pool;

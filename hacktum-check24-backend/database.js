const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'local_db',
    password: '973217',
    port: 5432,
});

module.exports = pool;

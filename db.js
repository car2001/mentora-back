const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'bmivk3xeyim0rl6c4mj5-mysql.services.clever-cloud.com',
    user: 'uh8qplv0zph7xsmg',
    port: 3306,
    password: 'N0T4W6KHdqIqwZZ4xx3c',   
    database: 'bmivk3xeyim0rl6c4mj5'
};

// Crea y exporta el pool de conexiones para que lo usen los modelos
const pool = mysql.createPool(dbConfig);
module.exports = pool;
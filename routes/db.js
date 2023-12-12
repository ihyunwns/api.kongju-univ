const mariaDB = require('mysql2');

const config = require('../config/db.json');
const pool = mariaDB.createPool({
    host: config.db_host, port: config.port,
    user: config.db_username, password: config.db_password,
    database: config.db_name, connectionLimit: 5
});

const sendData_toDB = async function(title, category, url){
    let connection;
    try{
        connection = await pool.promise().getConnection();

        const data = { title: title, category: category, url: url };
        const sql = `INSERT INTO ${config.db_table} SET ?`;

        const [results] = await connection.query(sql, data);
        console.log('Inserted row ID:', results.insertId);

    } catch(err){
        console.error('Error disconnecting from MariaDB:', err);
        throw err;
    } finally{
        if(connection){
            connection.release();
            console.log('Connection released');
        }
    }
}

module.exports = sendData_toDB;
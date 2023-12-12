const express = require('express');
const router = express.Router();
const mariaDB = require('mysql2');

const config = require('../config/db.json');
const pool = mariaDB.createPool({
    host: config.db_host, port: config.port,
    user: config.db_username, password: config.db_password,
    database: config.db_name, connectionLimit: 5
});

router.get('/', async (req, res) => {

    let connection;
    const category = req.query.category;
    try{
        connection = await pool.promise().getConnection();
        if(category == 'all'){
            const [rows, fields] = await connection.execute(`SELECT url, title FROM ${config.db_table}`);
            res.json(rows);
        }else{
            const [rows, fields] = await connection.execute(`SELECT url, title FROM ${config.db_table} WHERE category = '${category}'`);
            res.json(rows);
        }
    }catch(error){
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
        throw error;
    }finally{
        if(connection){
            connection.release();
            console.log('Connection released');
        }
    }
});

module.exports = router;
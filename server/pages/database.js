const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chhapi_madrasa'
  });
  
  connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the MySQL database');
  });

  module.exports = connection;


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = require('../database');

// GET stu_class DATA
app.get("/", (req, res) => {
  const sql = "SELECT * FROM stu_class";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from Stuclass Table in server.js: ", error);
      return res.status(500).json({ error: "Error fetching stu_class data" });
    }
    return res.json(result);
  });
});

// ADD stu_class DATA
app.post('/', (req, res) => {
  const { class_name } = req.body;

  const sql = "INSERT INTO stu_class (class_name) VALUES (?)";
  const data = [class_name];

  connection.query(sql, data, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: "Duplicate entry for class_name." });
      } else {
        console.log("Error Adding stu_class Data in server.js: ", error);
        return res.status(500).json({ error: "Error adding stu_class data" });
      }
    } else {
      return res.sendStatus(200);
    }
  });
});

// DELETE stu_class DATA
app.delete("/:class_id", (req, res) => {
  const class_id = req.params.class_id;
  const sql = `DELETE FROM stu_class WHERE class_id = ?`;
  connection.query(sql, [class_id], (error) => {
    if (error) {
      console.log("Error Deleting stu_class Data in server.js: ", error);
      return res.status(500).json({ error: "Error deleting stu_class data" });
    }
    return res.sendStatus(200);
  });
});

// EDIT stu_class DATA
app.get("/:class_id", (req, res) => {
  let class_id = req.params.class_id;
  const sql = `SELECT * FROM stu_class WHERE class_id=${class_id}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    console.log("Received PUT request with class_id:", class_id);

    return res.json(data);

  });
});

app.put("/:class_id", (req, res) => {
  let class_id = req.params.class_id;
  const { class_name } = req.body;
  
  let sql = `SELECT class_id FROM stu_class WHERE (class_name=?) AND class_id != ?`;
  const data = [class_name, class_id];
  connection.query(sql, data, (error, results) => {
    if (error) {
      console.log("Error Checking Duplicate Entry:", error);
      return res.status(500).json({ error: "Error checking duplicate entry" });
    }

    sql = `UPDATE stu_class SET class_name=? WHERE class_id=?`;
    const updateData = [class_name, class_id];
    connection.query(sql, updateData, (updateError) => {
      if (updateError) {
        console.log("Error Updating stu_class data: ", updateError);
        return res.status(500).json({ error: "Error updating stu_class data" });
      }
      return res.sendStatus(200);
    });
  });
});


module.exports = app;

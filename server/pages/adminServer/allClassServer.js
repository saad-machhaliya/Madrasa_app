const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = require('../database');

// GET all_class DATA
app.get("/", (req, res) => {
  const sql = "SELECT * FROM all_class";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from all_class Table in server.js: ", error);
      return res.status(500).json({ error: "Error fetching all_class data" });
    }
    return res.json(result);
  });
});

// ADD all_class DATA
app.post('/', (req, res) => {
  const { class_id, month_duration, year } = req.body;

  const sql = "INSERT INTO all_class (class_id, month_duration, year) VALUES (?, ?, ?)";
  const data = [class_id, month_duration, year];

  connection.query(sql, data, (error, results) => {
    if (error) {
      
        console.log("Error Adding all_class Data in server.js: ", error);
        return res.status(500).json({ error: "Error adding all_class data" });
      
    } else {
      return res.sendStatus(200);
    }
  });
});

// DELETE all_class DATA
app.delete("/:all_class_id", (req, res) => {
  const all_class_id = req.params.all_class_id;
  const sql = `DELETE FROM all_class WHERE all_class_id = ?`;
  connection.query(sql, [all_class_id], (error) => {
    if (error) {
      console.log("Error Deleting all_class Data in server.js: ", error);
      return res.status(500).json({ error: "Error deleting all_class data" });
    }
    return res.sendStatus(200);
  });
});

// EDIT all_class DATA
app.get("/:all_class_id", (req, res) => {
  let all_class_id = req.params.all_class_id;
  const sql = `SELECT * FROM all_class WHERE all_class_id=${all_class_id}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    console.log("Received PUT request with all_class_id:", all_class_id);
    return res.json(data);
  });
});

app.put("/:all_class_id", (req, res) => {
  let all_class_id = req.params.all_class_id;
  const { class_id, month_duration, year } = req.body;

    sql = `UPDATE all_class SET class_id=?, month_duration=?, year=? WHERE all_class_id=?`;
    const updateData = [class_id, month_duration, year, all_class_id];
    connection.query(sql, updateData, (updateError) => {
      if (updateError) {
        console.log("Error Updating all_class data: ", updateError);
        return res.status(500).json({ error: "Error updating all_class data" });
      }
      return res.sendStatus(200);
    });
  });

module.exports = app;

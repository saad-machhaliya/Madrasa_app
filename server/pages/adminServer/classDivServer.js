const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = require('../database');

// GET class_div DATA
app.get("/", (req, res) => {
  const sql = "SELECT * FROM class_div";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from Stuclass Table in server.js: ", error);
      return res.status(500).json({ error: "Error fetching class_div data" });
    }
    return res.json(result);
  });
});

// ADD class_div DATA
app.post('/', (req, res) => {
  const { division } = req.body;

  const sql = "INSERT INTO class_div (division) VALUES (?)";
  const data = [division];

  connection.query(sql, data, (error, results) => {
    if (error) {
      
        console.log("Error Adding class_div Data in server.js: ", error);
        return res.status(500).json({ error: "Error adding class_div data" });
      
    } else {
      return res.sendStatus(200);
    }
  });
});

// DELETE class_div DATA
app.delete("/:div_id", (req, res) => {
  const div_id = req.params.div_id;
  const sql = `DELETE FROM class_div WHERE div_id = ?`;
  connection.query(sql, [div_id], (error) => {
    if (error) {
      console.log("Error Deleting class_div Data in server.js: ", error);
      return res.status(500).json({ error: "Error deleting class_div data" });
    }
    return res.sendStatus(200);
  });
});

// EDIT class_div DATA
app.get("/:div_id", (req, res) => {
  let div_id = req.params.div_id;
  const sql = `SELECT * FROM class_div WHERE div_id=${div_id}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    console.log("Received PUT request with div_id:", div_id);

    return res.json(data);

  });
});

app.put("/:div_id", (req, res) => {
  let div_id = req.params.div_id;
  const { division } = req.body;

    sql = `UPDATE class_div SET division=? WHERE div_id=?`;
    const updateData = [division, div_id];
    connection.query(sql, updateData, (updateError) => {
      if (updateError) {
        console.log("Error Updating class_div data: ", updateError);
        return res.status(500).json({ error: "Error updating class_div data" });
      }
      return res.sendStatus(200);
    });
  });
;


module.exports = app;

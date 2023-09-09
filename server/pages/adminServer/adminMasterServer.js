const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = require('../database');

// GET Admin DATA
app.get("/", (req, res) => {
  const sql = "SELECT * FROM admin_master";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from Admin Table in server.js: ", error);
      return res.status(500).json({ error: "Error fetching Admin data" });
    }
    return res.json(result);
  });
});

// ADD Admin DATA
app.post('/', (req, res) => {
  const { username, password } = req.body;

  const sql = "INSERT INTO admin_master (username, password) VALUES (?, ?)";
  const data = [username, password];

  connection.query(sql, data, (error, results) => {
    if (error) {
      
        console.log("Error Adding Admin Data in server.js: ", error);
        return res.status(500).json({ error: "Error adding Admin data" });
      
    } else {
      return res.sendStatus(200);
    }
  });
});

// DELETE Admin DATA
app.delete("/:admin_id", (req, res) => {
  const admin_id = req.params.admin_id;
  const sql = `DELETE FROM admin_master WHERE admin_id = ?`;
  connection.query(sql, [admin_id], (error) => {
    if (error) {
      console.log("Error Deleting Admin Data in server.js: ", error);
      return res.status(500).json({ error: "Error deleting Admin data" });
    }
    return res.sendStatus(200);
  });
});

// EDIT Admin DATA
app.get("/:admin_id", (req, res) => {
  let admin_id = req.params.admin_id;
  const sql = `SELECT * FROM admin_master WHERE admin_id=${admin_id}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    console.log("Received PUT request with admin_id:", admin_id);

    return res.json(data);

  });
});

app.put("/:admin_id", (req, res) => {
  let admin_id = req.params.admin_id;
  const { username,password } = req.body;

    sql = `UPDATE admin_master SET username=?, password=? WHERE admin_id=?`;
    const updateData = [username, password, admin_id];
    connection.query(sql, updateData, (updateError) => {
      if (updateError) {
        console.log("Error Updating Admin data: ", updateError);
        return res.status(500).json({ error: "Error updating Admin data" });
      }
      return res.sendStatus(200);
    });
  });
;


module.exports = app;

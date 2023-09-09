const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = require('../database');

// GET user DATA
app.get("/", (req, res) => {
  const sql = "SELECT * FROM user_master";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from user Table in server.js: ", error);
      return res.status(500).json({ error: "Error fetching user data" });
    }
    return res.json(result);
  });
});

// ADD user DATA
app.post('/', (req, res) => {
  const { user_name } = req.body;

  const sql = "INSERT INTO user_master (user_name) VALUES (?)";
  const data = [user_name];

  connection.query(sql, data, (error, results) => {
    if (error) {
      
        console.log("Error Adding user Data in server.js: ", error);
        return res.status(500).json({ error: "Error adding user data" });
      
    } else {
      return res.sendStatus(200);
    }
  });
});

// DELETE user DATA
app.delete("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const sql = `DELETE FROM user_master WHERE user_id = ?`;
  connection.query(sql, [user_id], (error) => {
    if (error) {
      console.log("Error Deleting user Data in server.js: ", error);
      return res.status(500).json({ error: "Error deleting user data" });
    }
    return res.sendStatus(200);
  });
});

// EDIT user DATA
app.get("/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  const sql = `SELECT * FROM user_master WHERE user_id=${user_id}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    console.log("Received PUT request with user_id:", user_id);

    return res.json(data);

  });
});

app.put("/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  const { user_name } = req.body;

    sql = `UPDATE user_master SET user_name=? WHERE user_id=?`;
    const updateData = [user_name, user_id];
    connection.query(sql, updateData, (updateError) => {
      if (updateError) {
        console.log("Error Updating user data: ", updateError);
        return res.status(500).json({ error: "Error updating user data" });
      }
      return res.sendStatus(200);
    });
  });
;


module.exports = app;

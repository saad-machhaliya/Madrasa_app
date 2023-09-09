const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = require('../database');

// GET STU_FEES DATA
app.get("/", (req, res) => {
  const sql = "SELECT * FROM stu_wise_fees";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from stu_fees Table in server.js: ", error);
      return res.status(500).json({ error: "Error fetching stu_fees data" });
    }
    return res.json(result);
  });
});

// ADD STU_FEES DATA
app.post('/', (req, res) => {
  const { stu_id,class_id, amount, year } = req.body;

  const sql = "INSERT INTO stu_wise_fees (stu_id,class_id, amount, year) VALUES (?, ?, ?, ?)";
  const data = [stu_id, class_id, amount, year];

  connection.query(sql, data, (error, results) => {
    if (error) {
      
        console.log("Error Adding stu_fees Data in server.js: ", error);
        return res.status(500).json({ error: "Error adding stu_fees data" });
      
    } else {
      return res.sendStatus(200);
    }
  });
});

// DELETE stu_fees DATA
app.delete("/:stu_fees_id", (req, res) => {
  const stu_fees_id = req.params.stu_fees_id;
  const sql = `DELETE FROM stu_wise_fees WHERE stu_fees_id = ?`;
  connection.query(sql, [stu_fees_id], (error) => {
    if (error) {
      console.log("Error Deleting stu_fees Data in server.js: ", error);
      return res.status(500).json({ error: "Error deleting stu_fees data" });
    }
    return res.sendStatus(200);
  });
});

// EDIT all_class DATA
app.get("/:stu_fees_id", (req, res) => {
  let stu_fees_id = req.params.stu_fees_id;
  const sql = `SELECT * FROM stu_wise_fees WHERE stu_fees_id=${stu_fees_id}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    console.log("Received PUT request with stu_fees_id:", stu_fees_id);
    return res.json(data);
  });
});

app.put("/:stu_fees_id", (req, res) => {
  let stu_fees_id = req.params.stu_fees_id;
  const { stu_id, class_id, amount, year } = req.body;

    sql = `UPDATE stu_wise_fees SET stu_id=?, class_id=?, amount=?, year=? WHERE stu_fees_id=?`;
    const updateData = [stu_id, class_id, amount, year, stu_fees_id];
    connection.query(sql, updateData, (updateError) => {
      if (updateError) {
        console.log("Error Updating stu_fees data: ", updateError);
        return res.status(500).json({ error: "Error updating stu_fees data" });
      }
      return res.sendStatus(200);
    });
  });

module.exports = app;

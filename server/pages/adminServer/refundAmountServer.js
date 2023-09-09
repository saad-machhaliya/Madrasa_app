const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = require('../database');

// GET refund DATA
app.get("/", (req, res) => {
  const sql = "SELECT * FROM refund_amount";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from refund Table in server.js: ", error);
      return res.status(500).json({ error: "Error fetching refund data" });
    }
    return res.json(result);
  });
});

// ADD refund DATA
app.post('/', (req, res) => {
  const { stu_id,user_id, refunded_amount } = req.body;

  const sql = "INSERT INTO refund_amount (stu_id, user_id, refunded_amount) VALUES (?, ?, ?)";
  const data = [stu_id, user_id, refunded_amount];

  connection.query(sql, data, (error, results) => {
    if (error) {
      
        console.log("Error Adding refund Data in server.js: ", error);
        return res.status(500).json({ error: "Error adding refund data" });
      
    } else {
      return res.sendStatus(200);
    }
  });
});

// DELETE refund DATA
app.delete("/:refund_id", (req, res) => {
  const refund_id = req.params.refund_id;
  const sql = `DELETE FROM refund_amount WHERE refund_id = ?`;
  connection.query(sql, [refund_id], (error) => {
    if (error) {
      console.log("Error Deleting refund Data in server.js: ", error);
      return res.status(500).json({ error: "Error deleting refund data" });
    }
    return res.sendStatus(200);
  });
});

// EDIT all_class DATA
app.get("/:refund_id", (req, res) => {
  let refund_id = req.params.refund_id;
  const sql = `SELECT * FROM refund_amount WHERE refund_id=${refund_id}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    console.log("Received PUT request with refund_id:", refund_id);
    return res.json(data);
  });
});

app.put("/:refund_id", (req, res) => {
  let refund_id = req.params.refund_id;
  const { stu_id, user_id, refunded_amount } = req.body;

    sql = `UPDATE refund_amount SET stu_id=?, user_id=?, refunded_amount=? WHERE refund_id=?`;
    const updateData = [stu_id, user_id, refunded_amount, refund_id];
    connection.query(sql, updateData, (updateError) => {
      if (updateError) {
        console.log("Error Updating refund data: ", updateError);
        return res.status(500).json({ error: "Error updating refund data" });
      }
      return res.sendStatus(200);
    });
  });

module.exports = app;

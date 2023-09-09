const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = require('../database');

// GET payment DATA
app.get("/", (req, res) => {
  const sql = "SELECT * FROM payment_info";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from payment Table in server.js: ", error);
      return res.status(500).json({ error: "Error fetching payment data" });
    }
    return res.json(result);
  });
});

// ADD payment DATA
app.post('/', (req, res) => {
  const { stu_id,user_id, amount, date, deposited_by, receipt_number, paid_by } = req.body;

  const sql = "INSERT INTO payment_info (stu_id,user_id, amount, date, deposited_by, receipt_number, paid_by) VALUES (?, ?, ?, ?, ?, ? ,?)";
  const data = [stu_id, user_id, amount, date, deposited_by, receipt_number, paid_by];

  connection.query(sql, data, (error, results) => {
    if (error) {
      
        console.log("Error Adding payment Data in server.js: ", error);
        return res.status(500).json({ error: "Error adding payment data" });
      
    } else {
      return res.sendStatus(200);
    }
  });
});

// DELETE payment DATA
app.delete("/:payment_id", (req, res) => {
  const payment_id = req.params.payment_id;
  const sql = `DELETE FROM payment_info WHERE payment_id = ?`;
  connection.query(sql, [payment_id], (error) => {
    if (error) {
      console.log("Error Deleting payment Data in server.js: ", error);
      return res.status(500).json({ error: "Error deleting payment data" });
    }
    return res.sendStatus(200);
  });
});

// EDIT all_class DATA
app.get("/:payment_id", (req, res) => {
  let payment_id = req.params.payment_id;
  const sql = `SELECT * FROM payment_info WHERE payment_id=${payment_id}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    console.log("Received PUT request with payment_id:", payment_id);
    return res.json(data);
  });
});

app.put("/:payment_id", (req, res) => {
  let payment_id = req.params.payment_id;
  const { stu_id, user_id, amount, date, deposited_by, receipt_number, paid_by } = req.body;

    sql = `UPDATE payment_info SET stu_id=?, user_id=?, amount=?, date=?, deposited_by=? ,receipt_number=?, paid_by=? WHERE payment_id=?`;
    const updateData = [stu_id, user_id, amount, date, deposited_by, receipt_number, paid_by, payment_id];
    connection.query(sql, updateData, (updateError) => {
      if (updateError) {
        console.log("Error Updating payment data: ", updateError);
        return res.status(500).json({ error: "Error updating payment data" });
      }
      return res.sendStatus(200);
    });
  });

module.exports = app;

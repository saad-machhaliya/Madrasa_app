const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = require('../database');

//GET STUDENT DATA

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student_master";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from Students Table in server.js: ", error);
      return res.status(500).json({ error: "Error fetching student data" });
    }
    return res.json(result);
  });
});

//ADD STUDENT DATA

app.post('/', (req, res) => {
  const { gr_number, f_name, m_name, l_name, grandf_name, nick_name, village, mobile_number } = req.body;

  const sql = "INSERT INTO student_master (gr_number, f_name, m_name, l_name, grandf_name, nick_name, village, mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const data = [gr_number, f_name, m_name, l_name, grandf_name, nick_name, village, mobile_number];

  connection.query(sql, data, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: "Duplicate entry for GR number or Nickname." });
      } else {
        console.log("Error Adding student Data in server.js: ", error);
        return res.status(500).json({ error: "Error adding student data" });
      }
    } else {
      return res.sendStatus(200);
    }
  });
});

//DELETE STUDENT DATA


app.delete("/:stu_id", (req, res) => {
  const stu_id = req.params.stu_id;
  const sql = `DELETE FROM student_master WHERE stu_id = ?`;
  connection.query(sql, [stu_id], (error) => {
    if (error) {
      console.log("Error Deleting student Data in server.js: ", error);
      return res.status(500).json({ error: "Error deleting student data" });
    }
    return res.sendStatus(200);
  });
});

//EDIT STUDENT DATA

app.get("/:stu_id", (req, res) => {
  let stu_id = req.params.stu_id;
  const sql = `SELECT * FROM student_master WHERE stu_id=${stu_id}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/:stu_id", (req, res) => {
  let stu_id = req.params.stu_id;
  const { gr_number, f_name, m_name, l_name, grandf_name, nick_name, village, mobile_number } = req.body;
  let sql = `SELECT stu_id FROM student_master WHERE (gr_number=? OR nick_name=?) AND stu_id != ?`;
  const data = [gr_number, nick_name, stu_id];
  console.log("Request body:", req.body);
console.log("Data array:", data);
  connection.query(sql, data, (error, results) => {
    if (error) {
      console.log("Error Checking Duplicate Entry:", error);
      return res.status(500).json({ error: "Error checking duplicate entry" });
    }
    
    sql = `UPDATE student_master SET gr_number=?,f_name=?,m_name=?,l_name=?,grandf_name=?,nick_name=?,village=?,mobile_number=? WHERE stu_id=?`;
    const updateData = [gr_number, f_name, m_name, l_name, grandf_name, nick_name, village, mobile_number, stu_id];
    connection.query(sql, updateData, (updateError) => {
      if (updateError) {
        console.log("Error Updating student data: ", updateError);
        return res.status(500).json({ error: "Error updating student data" });
      }
      return res.sendStatus(200);
    });
  });
});


module.exports = app;

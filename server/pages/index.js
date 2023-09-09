const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());


const studentServer = require('./adminServer/studentServer');
const stuClassServer = require('./adminServer/stuClassServer');
const allClassServer = require('./adminServer/allClassServer');
const ClassDivServer = require('./adminServer/classDivServer');
const StuFeesServer = require('./adminServer/stuFeesServer');
const UserServer = require('./adminServer/userServer');
const PaymentInfoServer = require('./adminServer/paymentInfoServer');
const RefundAmountServer = require('./adminServer/refundAmountServer');
const AdminMasterServer = require('./adminServer/adminMasterServer');


app.use('/students', studentServer);
app.use('/stuclass', stuClassServer);
app.use('/allclass', allClassServer);
app.use('/classdiv', ClassDivServer);
app.use('/stufees', StuFeesServer);
app.use('/user', UserServer);
app.use('/payment', PaymentInfoServer);
app.use('/refund', RefundAmountServer);
app.use('/admin', AdminMasterServer);




const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

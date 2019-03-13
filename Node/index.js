const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
let db_url = 'mongodb+srv://rfsouza:rfs2019@cluster0-fjp7a.mongodb.net/test?retryWrites=true';

const mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

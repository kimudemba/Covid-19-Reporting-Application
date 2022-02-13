/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const itemRouter = require('./routes/item-router');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true })); //allows us to attach params to a url
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined')); //for logging errors

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/***************
 registering routes on root server
 **************/
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', itemRouter);

app.listen(apiPort, () => {
  console.log(`[Hack.Diversity React Template] - Server running on port ${apiPort}`);
});

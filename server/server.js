/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');

const examsRouter = require('./routes/examsRouter');
const patientsRouter = require('./routes/patientsRouter');

const app = express();
const apiPort = process.env.PORT || 3000;

app.disable('x-powered-by'); //Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express (or whichever framework you use) here we disable this vulnerability
app.use(bodyParser.urlencoded({ extended: true })); //allows us to attach params to a url
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny')); //for logging errors

/***************
 registering routes on root server.js
 **************/
app.use('/api/exams', examsRouter); //first pg user sees
app.use('/api/patients', patientsRouter);

/***************
 app listening
 **************/
async function start() {
  try {
    await db.on('connected db', () => {});
    app.listen(apiPort, () => {
      morgan(`Server is listening on port ${apiPort}`);
    });
  } catch (err) {
    morgan(err);
  }
}
module.exports = start;

/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');
const RouteErrorHandler = require('./testing_routes&ctrs/routeErrorHandler');

const examsRouterTest = require('./testing_routes&ctrs/examsRouterTest');
const patientsRouterTest = require('./testing_routes&ctrs/patientsRouterTest');

/******* uncommenting below two until controllers get fixed to CRUD into mongo db  ********/
// const examsRouter = require('./routes/examsRouter');
// const patientsRouter = require('./routes/patientsRouter');

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
app.use('/api/exams', examsRouterTest); //first pg user sees
app.use('/api/patients', patientsRouterTest);

// app.use('/api/exams', examsRouter); //first pg user sees
// app.use('/api/patients', patientsRouter);

//special error handling middleware fncn to handle errors, express will apply on every incoming request
app.use((error, req, res, next) => {
  //if resp is already sent, do not send another one
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message || 'An unknown error occurred' });
});

//handling unsupported routes
app.use((req, res, next) => {
  const error = new RouteErrorHandler('Route not found', 404);
  throw error;
});

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

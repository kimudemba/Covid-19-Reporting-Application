/**
 * Homepage Router
 */
const express = require('express');
const debug = require('debug')('index: examsRouter');
const { MongoClient } = require('mongodb');

// TODO: const examsController = require('../controllers/exams-controller');

const examsRouter = express.Router();

examsRouter.route('/exams').get((req, res) => {
  const url = 'mongodb+srv://crtl123:crtl123@crtlaltelitecluster.1bbx9.mongodb.net/PatientData';
  const dbName = 'PatientData';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected correctly to database server');

      const db = client.db(dbName);

      const response = await db
        .collection('PatientData')
        .find()
        .toArray();

      res.render(response);
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  })();
});

examsRouter.route('/exams/:id').get((req, res) => {
  const id = req.params.id; // Get the id from the url
  const url = 'mongodb+srv://crtl123:crtl123@crtlaltelitecluster.1bbx9.mongodb.net/PatientData';
  const dbName = 'PatientData';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected correctly to database server');

      const db = client.db(dbName);

        const response = await db
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  })();
});

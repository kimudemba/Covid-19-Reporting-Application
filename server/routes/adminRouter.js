const express = require('express');
const debug = require('debug')('index: adminRouter');
const { MongoClient } = require('mongodb');
// TODO: const adminController = require('../controllers/admin-controller');

const adminRouter = express.Router();

adminRouter.route('/admin').get((req, res) => {
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

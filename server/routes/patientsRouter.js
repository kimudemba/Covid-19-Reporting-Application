/**
 * Patients Router
 **/
const express = require('express');
const debug = require('debug')('index: examsRouter');
const { MongoClient } = require('mongodb');

// TODO: const patientsController = require('../controllers/patients-controller');

//mock for inital testing purposes UNTIL controller is created
const mockController = (req, res) => {
  res.json({ message: 'ok patients' });
};

const patientsRouter = express.Router();

/*patientsRouter.route('/').get((req, res) => {
  const url = "mongodb+srv://kim:cunDrnVvKN8vf86@crtlaltelitecluster.1bbx9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const dbName = 'ctrlaltelite';
  
});*/
async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb+srv://kim:cunDrnVvKN8vf86@crtlaltelitecluster.1bbx9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

const result = await client.db("PatientData").collection("items").findOne();

// /api/patients
patientsRouter
  .route('/patients')
  //   .get(mockController.getPatients)
  .get(mockController)
  //   .post(mockController.createOnePatient);
  .post(mockController);

// /api/patients/:id
patientsRouter
  .route('/patients/:id')
  //   .get(mockController.getOnePatient)
  .get(mockController)
  //   .put(mockController.updateOnePatient)
  .put(mockController)
  //   .delete(mockController.deleteOnePatient);
  .delete(mockController);

module.exports = patientsRouter;

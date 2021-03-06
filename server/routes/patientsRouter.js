/**
 * Patients Router
 **/
const express = require('express');
const debug = require('debug')('index: examsRouter');
const patientsController = require('../controllers/patientsController');
const patientsRouter = express.Router();

// '/' === '/api/patients'
// http://localhost:3000/api/patients/ - inside server.js this uses stmt: app.use('/api/patients', patientsRouter) - to get all patients
patientsRouter.get('/', patientsController.getPatients);
patientsRouter.post('/', patientsController.createOnePatient);

// api/patients/:id
patientsRouter.get('/:PATIENT_ID', patientsController.getpatientById);
patientsRouter.put('/:PATIENT_ID', patientsController.updatePatient);

patientsRouter.delete('/patients', patientsController.deleteOnePatient);

module.exports = patientsRouter; 

/* const express = require('express');
 const debug = require('debug')('index: examsRouter');
 const { MongoClient } = require('mongodb');
 const patientsController = require('../controllers/patientsController')
 
 // TODO: const patientsController = require('../controllers/patients-controller');
 
 //mock for inital testing purposes UNTIL controller is created
  const mockController = (req, res) => {
   res.json({ message: 'ok patients' });
};
 
 const patientsRouter = express.Router();
 
 // /api/patients
 patientsRouter
   .route('/patients')
      .get(patientsController.getPatients)
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
 
 module.exports = patientsRouter; */


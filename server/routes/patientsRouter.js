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
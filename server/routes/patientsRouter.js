/**
 * Patients Router
 **/
const express = require('express');
const debug = require('debug')('index: examsRouter');
const patientsController = require('../controllers/patientsController');

const patientsRouter = express.Router();

// '/' === '/api/patients'
// http://localhost:3000/api/patients/ - inside server.js this uses stmt: app.use('/api/patients', patientsRouter) - to get all patients
// patientsRouter.get('/', patientsController.getPatients);

// patientsRouter.post('/', patientsController.createOnePatient);

// /api/patients/:id
// patientsRouter.get('/:PATIENT_ID', patientsController.getpatientById);

// patientsRouter.put('/:PATIENT_ID', patientsController.updatePatient);

// patientsRouter.delete('/:PATIENT_ID', patientsController.deleteOnePatient);

module.exports = patientsRouter;

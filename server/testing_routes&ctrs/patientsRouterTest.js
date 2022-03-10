/**
 * Patients Router (note - the order of routes matters)
 **/
 const express = require('express');
 const patientsCtrTest = require('./patientsCtrTest');
 
 const patientsRouterTest = express.Router();
 
 // /api/patients
 // http://localhost:3000/api/patients/ - inside server.js this uses stmt: app.use('/api/patients', patientsRouterTest);
 patientsRouterTest.get('/', patientsCtrTest.getPatients);
 
 patientsRouterTest.post('/', patientsCtrTest.createOnePatient);
 
 // /api/patients/:id
 patientsRouterTest.put('/:PATIENT_ID', patientsCtrTest.updateOnePatient);
 
 patientsRouterTest.delete('/:PATIENT_ID', patientsCtrTest.deleteOnePatient);
 
 module.exports = patientsRouterTest;
 
 //mock for inital testing purposes UNTIL controller is created
 //  const mockController = (req, res) => {
 //    res.json({ message: 'ok patients' });
 //  };
 
/**
 * Patients Router (note - the order of routes matters)
 **/
const express = require('express');
const patientsCtrTest = require('./patientsCtrTest');

const patientsRouterTest = express.Router();

// /api/patients
// http://localhost:3000/api/patients/ - inside server.js this uses stmt: app.use('/api/patients', patientsRouterTest);
patientsRouterTest.get('/', patientsCtrTest.getPatients);

// /api/patients/:id
// http://localhost:3000/api/patients/123 - able to get a patient by its patient id
patientsRouterTest.get('/:PATIENT_ID', patientsCtrTest.getPatientByID);

// http://localhost:3000/api/patients/exam/e1 - able to get a patient by their exam id
patientsRouterTest.get('/exam/:exam_Id', patientsCtrTest.getPatientsByExamID);

patientsRouterTest.post('/', patientsCtrTest.createOnePatient);

patientsRouterTest.put('/patients/:id', patientsCtrTest.updateOnePatient);

patientsRouterTest.delete('/patients/:id', patientsCtrTest.deleteOnePatient);

module.exports = patientsRouterTest;

//mock for inital testing purposes UNTIL controller is created
//  const mockController = (req, res) => {
//    res.json({ message: 'ok patients' });
//  };

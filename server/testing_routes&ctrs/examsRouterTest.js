/**
 * Homepage (/exams) Router (note - the order of routes matters)
 **/
 const express = require('express');
 const examsCtrTest = require('./examsCtrTest');
 
 const examsRouterTest = express.Router();
 
 // /api/exams
 // http://localhost:3000/api/exams/ - inside server.js this uses stmt: app.use('/api/exams', examsRouterTest);
 examsRouterTest.get('/', examsCtrTest.getAllExams);
 
 // /api/exams/:id
 // http://localhost:3000/api/exams/e1 - able to get an exam by its exam id
 examsRouterTest.get('/:exam_Id', examsCtrTest.getExamByMongID);
 
 // http://localhost:3000/api/exams/patient/123 - able to get an exam by its patient id
 examsRouterTest.get('/patient/:PATIENT_ID', examsCtrTest.getExamsByPatientID);
 
 examsRouterTest.post('/', examsCtrTest.createOneExam);
 
 examsRouterTest.patch('/:exam_Id', examsCtrTest.updateOneExam);
 
 examsRouterTest.delete('/:exam_Id', examsCtrTest.deleteOneExam);
 
 module.exports = examsRouterTest;
 
 //mock for inital testing purposes UNTIL controller is created
 // const mockController = (req, res) => {
 //   res.json({ message: 'ok exams' });
 // };
 
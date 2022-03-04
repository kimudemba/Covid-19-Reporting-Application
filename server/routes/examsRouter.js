/**
 * Homepg (Exams) Router
 **/
const express = require('express');
const debug = require('debug')('index: examsRouter');
const examsController = require('../controllers/examsController');
const { MongoClient } = require('mongodb');
const examsRouter = express.Router();

// '/' === '/api/exams'
// http://localhost:3000/api/exams/ - inside server.js this uses stmt: app.use('/api/exams', examsRouter) - to get all exams
// examsRouter.post('/', examsController.createExam);

/****** Eddy ? to implement remaining below methods in examsController.js ******/

// /api/exams/:id
examsRouter.get('/', examsController.getExams);

examsRouter.get('/:PATIENTID', examsController.getexamById);

examsRouter.post('/:PATIENTID', examsController.createOneExam); //this was added

examsRouter.put('/:PATIENTID', examsController.updateOneExam);

examsRouter.delete('/:PATIENTID', examsController.deleteOneExam);

module.exports = examsRouter;

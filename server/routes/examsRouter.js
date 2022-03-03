/**
 * Homepg (Exams) Router
 **/
const express = require('express');
const debug = require('debug')('index: examsRouter');
const examsController = require('../controllers/examsController');

const examsRouter = express.Router();

// '/' === '/api/exams'
// http://localhost:3000/api/exams/ - inside server.js this uses stmt: app.use('/api/exams', examsRouter) - to get all exams
// examsRouter.post('/', examsController.createExam);

/****** Eddy ? to implement remaining below methods in examsController.js ******/

// /api/exams/:id
examsRouter.get('/', examsController.getExams);

examsRouter.get('/:PATIENT_ID', examsController.getOneExam);

examsRouter.put('/:PATIENT_ID', examsController.updateOneExam);

examsRouter.delete('/:PATIENT_ID', examsController.deleteOneExam);

module.exports = examsRouter;

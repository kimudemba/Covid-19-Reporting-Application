/**
 * Homepg (Exams) Router
 **/
 const express = require('express');
 const debug = require('debug')('index: examsRouter');
 const { MongoClient } = require('mongodb');
 
 // TODO: const examsController = require('../controllers/exams-controller');
 
 //mock for inital testing purposes UNTIL controller is created
 const mockController = (req, res) => {
   res.json({ message: 'ok exams' });
 };
 
 const examsRouter = express.Router();
 
 // /api/exams
 examsRouter
   .route('/exams')
   //   .get(mockController.getExams)
   .get(mockController)
   //   .post(mockController.createOneExam);
   .post(mockController);
 
 // /api/exams/:id
 examsRouter
   .route('/exams/:id')
   //   .get(mockController.getOneExam)
   .get(mockController)
   //   .put(mockController.updateOneExam)
   .put(mockController)
   //   .delete(mockController.deleteOneExam);
   .delete(mockController);
 
 module.exports = examsRouter;
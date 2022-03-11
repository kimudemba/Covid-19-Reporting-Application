const RouteErrorHandler = require('../testing_routes&ctrs/routeErrorHandler');
const uuid = require('uuid').v4;
const Exam = require('../models/examModel');

let DUMMY_EXAMS = [
  {
    exam_Id: 'e1',
    png_filename: '1.png',
    key_findings: 'Nothing',
    //from patient table link
    // AGE: '30',
    // SEX: 'MALE',
    // LATEST_BMI: '24',
    // ZIP: '02190',
    patient_Id: 'test123',
  },
];
/************************************** */
//aka get all exams - confirmed works by testing in Postman and locally
const getAllExams = async (req, res, next) => {
  // return Exam.find({}).exec();
  let exams;
  try {
    exams = await Exam.find({});
  } catch (err) {
    const error = new HttpError('Fetching exams failed, please try again later.', 500);
    return next(error);
  }
  res.json({ exams: exams.map(exam => exam.toObject({ getters: true })) });
};

/************************************** */
//aka 'ID' meaning the Mongo DB ID - confirmed works by testing in Postman and locally
const getExamByMongID = async (req, res, next) => {
  const examId = req.params.exam_Id;

  let exam;
  try {
    exam = await Exam.findById(examId);
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not find specific exam.', 500);
    return next(error);
  }

  if (!exam) {
    const error = new RouteErrorHandler('Could not find an exam from the provided id.', 404);
    return next(error);
  }

  res.json({ exam: exam.toObject({ getters: true }) }); // => { place } => { place: place }
};

/************************************** */
//aka 'ID' meaning the Patient ID - confirmed works by testing in Postman and locally
const getExamsByPatientID = async (req, res, next) => {
  const patientExams = await Exam.find({ patientId: req.params.patientId });

  if (!patientExams) {
    res.status(400);
    throw new Error('No exams for this specific patient id');
  }

  res.status(200).json(patientExams);
};

/************************************** */
//works in Postman and locally - I confirmed by retrieving all exams from the database in localhos (http://localhost:3000/api/exams/) and ctrl+f the specific mongo id of the exam I just created
const createOneExam = async (req, res, next) => {
  //post reqs have a req body

  // AGE, SEX, LATEST_BMI, ZIP
  const { patient_Id, exam_Id, png_filename, key_findings } = req.body;

  const createdExam = new Exam({
    patient_Id,
    exam_Id,
    png_filename,
    key_findings,
  });

  try {
    await createdExam.save();
  } catch (err) {
    const error = new RouteErrorHandler('Creating exam failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ exam: createdExam }); //201 for new obj
};
/************************************** */
//works in Postman and locally - I confirmed by retrieving all exams from the database in localhost (http://localhost:3000/api/exams/) and ctrl+f the specific mongo id of the exam I just updated
const updateOneExam = async (req, res, next) => {
  const { png_filename, key_findings } = req.body;
  const examId = req.params.exam_Id;

  let exam;
  try {
    exam = await Exam.findById(examId);
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not update exam', 500);
    return next(error);
  }
  exam.png_filename = png_filename;
  exam.key_findings = key_findings;

  try {
    await exam.save();
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not update exam', 500);
    return next(error);
  }

  res.status(200).json({ exam: exam.toObject({ getters: true }) });
};
/************************************** */
//works in Postman and locally - I confirmed by retrieving all exams from the database in localhost (http://localhost:3000/api/exams/) and ctrl+f the specific mongo id of the exam I just deleted
const deleteOneExam = async (req, res, next) => {
  const examId = req.params.exam_Id;

  let exam;
  try {
    exam = await Exam.findById(examId);
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not delete exam', 500);
    return next(error);
  }

  try {
    await exam.remove();
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not delete exam', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Deleted exam.' });
};
/************************************** */
module.exports = {
  getAllExams,
  getExamByMongID,
  getExamsByPatientID,
  createOneExam,
  updateOneExam,
  deleteOneExam,
};

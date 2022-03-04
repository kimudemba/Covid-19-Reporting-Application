const RouteErrorHandler = require('../testing_routes&ctrs/routeErrorHandler');
const uuid = require('uuid').v4;
const Exam = require('../models/examModel');
const Patient = require('../models/patientModel');

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
//aka 'ID' meaning the Mongo ID
const getExamByID = async (req, res, next) => {
  const examId = req.params.exam_Id;

  let exam;
  try {
    exam = await Exam.findById(examId);
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not find a place.', 500);
    return next(error);
  }

  if (!exam) {
    const error = new RouteErrorHandler('Could not find an exam from the provided id.', 404);
    return next(error);
  }

  res.json({ exam: exam.toObject({ getters: true }) }); // => { place } => { place: place }
};

/************************************** */
const getExamsByPatientID = async (req, res, next) => {
  const patientId = req.params.PATIENT_ID;

  let exams;
  try {
    exams = await Exam.find({ patient_Id: patientId });
  } catch (err) {
    const error = new RouteErrorHandler(
      'Something went wrong, could not find a exam by patient id.',
      500,
    );
    return next(error);
  }

  if (!exams || exams.length === 0) {
    return next(new RouteErrorHandler('Could not find exams for this patient id.', 404));
  }

  res.json({ exams: exams.map(exam => exam.toObject({ getters: true })) });
};
/************************************** */

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
  getExamByID,
  getExamsByPatientID,
  createOneExam,
  updateOneExam,
  deleteOneExam,
};

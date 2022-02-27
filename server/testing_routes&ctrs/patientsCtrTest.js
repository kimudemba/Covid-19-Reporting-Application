const RouteErrorHandler = require('./routeErrorHandler');
const uuid = require('uuid').v4;
const Patient = require('../models/patientModel');

let DUMMY_PATIENTS = [
  {
    PATIENT_ID: '123',
    exam_Id: 'e1', //from exam table link
    png_filename: '1.png',
    key_findings: 'Nothing',
    AGE: '30',
    SEX: 'MALE',
    LATEST_BMI: '24',
    ZIP: '02190',
  },
];
/************************************** */
//below testing - works in POSTMAN showing patients from mongo ()and locally)
const getPatients = async (req, res, next) => {
  let patients;
  try {
    patients = await Patient.find({}, '-PATIENT_ID');
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not find a patient.', 500);
    return next(error);
  }

  console.log('GET request in places for all patients');
  // res.json({ patients: DUMMY_PATIENTS });
  res.json({ patients: patients.map(p => p.toObject({ getters: true })) });
};
/************************************** */
//below testing - NOT working locally in POSTMAN or mongo
const getPatientByID = (req, res, next) => {
  const patientId = req.params.PATIENT_ID;
  const patient = DUMMY_PATIENTS.find(p => {
    return p.PATIENT_ID === patientId;
  });

  if (!patient) {
    throw new RouteErrorHandler('Could not find patient with given patient id', 404); //trigger server.js error handler
  }

  console.log('GET request in place for one patient by PATIENT_ID');
  res.json({ patient });
};
/************************************** */
//below testing - NOT working locally in POSTMAN or mongo
const getPatientsByExamID = (req, res, next) => {
  const exam_Id = req.params.exam_Id;

  const patients = DUMMY_PATIENTS.filter(p => {
    return p.exam_Id === exam_Id;
  });

  if (!patients || patients.length === 0) {
    return next(new RouteErrorHandler('patient not found from the provided exam id', 404)); //trigger server.js error handler + cannot forget to return here
  }

  console.log('GET request in place for one patient by its exam id');
  res.json({ patients });
};
/************************************** */
//below testing - works to create patient in a seperate collection on mongo
const createOnePatient = async (req, res, next) => {
  //post reqs have a req body

  const { PATIENT_ID, exam_Id, png_filename, key_findings, AGE, SEX, LATEST_BMI, ZIP } = req.body;

  // const hasPatient = DUMMY_PATIENTS.find(p => p.PATIENT_ID === PATIENT_ID);
  // if (hasPatient) {
  //   throw new RouteErrorHandler('could not create patient, patient patient id already exists', 422);
  // }

  const createdPatient = new Patient({
    PATIENT_ID,
    exam_Id,
    png_filename,
    key_findings,
    AGE,
    SEX,
    LATEST_BMI,
    ZIP,
  });

  // DUMMY_PATIENTS.push(createdPatient);

  try {
    await createdPatient.save();
  } catch (err) {
    const error = new RouteErrorHandler('Creating patient failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ patient: createdPatient }); //201 for new obj
};
/************************************** */
//below testing - NOT working locally in POSTMAN or mongo
const updateOnePatient = (req, res, next) => {
  //for patch reqs, we have a req body
  const { png_filename, key_findings, AGE, SEX, LATEST_BMI, ZIP } = req.body;
  const patientid = req.params.PATIENT_ID;

  const updatedPatient = { ...DUMMY_PATIENTS.find(p => p.PATIENT_ID === patientid) };

  const patientIndex = DUMMY_PATIENTS.findIndex(p => p.PATIENT_ID === patientid);

  updatedPatient.png_filename = png_filename;
  updatedPatient.key_findings = key_findings;
  updatedPatient.AGE = AGE;
  updatedPatient.SEX = SEX;
  updatedPatient.LATEST_BMI = LATEST_BMI;
  updatedPatient.ZIP = ZIP;

  DUMMY_PATIENTS[patientIndex] = updatedPatient;

  res.status(200).json({ patient: updatedPatient });
};
/************************************** */
//below testing - NOT working locally in POSTMAN or mongo
const deleteOnePatient = async (req, res, next) => {
  // const patientid = req.params.PATIENT_ID;
  // DUMMY_PATIENTS = DUMMY_PATIENTS.filter(p => p.PATIENT_ID !== patientid);
  // res.status(200).json({ message: 'Deleted patient.' });
  const patientId = req.params.PATIENT_ID;

  let patient;
  try {
    patient = await Patient.findById(patientId);
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not delete patient', 500);
    return next(error);
  }

  try {
    await patient.remove();
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not delete patient', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Deleted patient' });
};

module.exports = {
  getPatients,
  getPatientByID,
  getPatientsByExamID,
  createOnePatient,
  updateOnePatient,
  deleteOnePatient,
};

const RouteErrorHandler = require('./routeErrorHandler');
const mongoose = require('mongoose');
const uuid = require('uuid').v4;
const Patient = require('../models/patientModel');
const asyncHandler = require('express-async-handler');

let DUMMY_PATIENTS = [
  {
    PATIENTID: '123',
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
//aka get all patients - confirmed works by testing in Postman and locally
const getPatients = async (req, res, next) => {
  let patients;
  try {
    patients = await Patient.find({}, '-PATIENTID');
  } catch (err) {
    const error = new RouteErrorHandler('Something went wrong, could not find a patient.', 500);
    return next(error);
  }

  console.log('GET request in patients for all patients');
  // res.json({ patients: DUMMY_PATIENTS });
  res.json({ patients: patients.map(p => p.toObject({ getters: true })) });
};
/************************************** */
//- confirmed works by testing in Postman and locally
const createOnePatient = async (req, res, next) => {
  const body = req.body;
  if (!body) {
    //exception hadeling for body
    res.status(400);
    throw new Error('Please enter in fields');
  }
  const newPatient = await Patient.create(body);

  res.status(200).json(newPatient);
};

/************************************** */

module.exports = {
  getPatients,
  createOnePatient,
  deleteOnePatient,
};

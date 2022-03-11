/* eslint-disable no-undef, arrow-body-style */
const patient = require('../models/patientModel');

getPatients = async (req, res) => {

  await patient
    .find({}, (err, patients) => {
      if (err) {
        console.error(`[Hack.Diversity React Template] - 400 in 'getPatients': ${err}`);
        return res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!patients.length) {
        console.error(`[Hack.Diversity React Template] - 404 in 'getPatients': Patients not found`);
        return res.status(200).json({
          success: true,
          patients: [],
        });
      }
      console.log(`[Hack.Diversity React Template] - 200 in 'getPatients': patients fetched!`);
      return res.status(200).json({
        success: true,
        patients: patients,
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'getPatients': ${err}`);
      console.error(err);
      return res.status(404).json({
        success: false,
        error: err,
      });
    });
};

getpatientById = async (req, res) => {
  await patient
    .find({ _id: req.params.id }, (err, patient) => { //changed from patients
      if (err) {
        console.error(`[Hack.Diversity React Template] - 400 in 'getpatientById': ${err}`);
        throw res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!patient.length) {
        console.error(
          `[Hack.Diversity React Template] - 404 in 'getpatientById': patient not found`,
        );
        return res.status(404).json({
          success: false,
          error: 'patient not found',
        });
      }
      console.log(`[Hack.Diversity React Template] - 200 in 'getpatientById': patient fetched!`);
      return res.status(200).json({
        success: true,
        patient: patient[0],


      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'getpatientById': ${err}`);
      console.error(err);
      return err;
    });
};

//keep an eye out here
createOnePatient = (req, res) => {

  //do the same with "body" like examController
  const body = req.body;
  // console.log('----------------------- createpatient: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createpatient: body -----------------------')
  console.log(body);
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a patient.',
    });
  }
  const patient = new patient(body);

  if (!patient) {

    console.error(
      `[Hack.Diversity React Template] - 400 in 'createpatient': 'patient' is malformed.`,
    );

    return res.status(400).json({
      success: false,
      message: "'patient' is malformed",
    });
  }

  // console.log('----------------------- createpatient: patient -----------------------')
  console.log(patient);

  return patient
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createPatient': patient created!`);
      return res.status(201).json({
        success: true,
        id: patient._id,
        message: 'patient created!',
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'createPatient'`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
        console.error(
          `[Hack.Diversity React Template] => ${
            ((err.errors[errorKey] || {}).properties || {}).message
          }`,
        );
      });
      return res.status(400).json({
        success: false,
        error: err.errors,
        message: err.errors.name,
      });
    });
};

updatePatient = async (req, res) => {
  const body /*{PATIENTID, exam_Id, png_filename, key_findings, AGE, SEX, LATEST_BMI, ZIP}*/ = req.body;
  if (!body) {

    console.error(
      `[Hack.Diversity React Template] - 400 in 'updatePatient': You must provide a patient to update.`,
    );
    return res.status(400).json({
      success: false,
      error: 'You must provide an patient to update.',
    });
  }
  //changed to match Yams's test controller
  //for some reason this is causing an error; will discuss as a team
  //updated these ; no longer an error will discuss with team
 const patientForUpdate = {
    _id: req.params.id,
    PATIENTID: body.PATIENTID,
    exam_Id: body.exam_Id,
    png_filename: body.png_filename,
    key_findings: body.key_findings,
    AGE: body.AGE,
    SEX: body.SEX,
    LATEST_BMI: body.LATEST_BMI,
    ZIP: body.ZIP
  };

  // console.log('----------------------- updatePatient: res -----------------------');
  console.log(res);

  try {
    await patient.findOneAndUpdate({ _id: req.params.id }, patientForUpdate);
  } catch (err) {
    console.error(`[Hack.Diversity React Template] - caught error in 'updatePatient': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`[Hack.Diversity React Template] - 200 in 'updatePatient': patient updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: 'patient updated!',
  });
};


deleteOnePatient = async (req, res) => {
  await patient
    .findOneAndDelete({ _id: req.params.id }, (err, patient) => {
      if (err) {
        console.error(`[Hack.Diversity React Template] - 400 in 'deleteOnePatient': ${err}`);
        return res.status(400).json({
          succes: false,
          error: err,
        });
      }

      if (!patient) {
        console.error(
          `[Hack.Diversity React Template] - 400 in 'deleteOnePatient': patient not found!`,
        );
        return res.status(400).json({
          success: false,
          error: 'patient not found!',
        });
      }

      return res.status(200).json({
        success: true,
        patient: patient,
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'deleteOnePatient': ${err}`);
      console.error(err);
      return err;
    });

};

/*const myEndPoint = async (req, res) => {
  return res.status(200).json({
    myValue({ _id: req.params.id }, (err, patients) => {

    });
  };*/

module.exports = {
  getPatients,

  getpatientById,
  createOnePatient,
  updatePatient,
  deleteOnePatient,

};

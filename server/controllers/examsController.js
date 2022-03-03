//const { execMap } = require('nodemon/lib/config/defaults')
const exam = require('../models/examModel');

//to be getExams
getExams = async (req, res) => {

  await exam
    .find({}, (err, exams) => {
      if (err) {
        console.error(`[Hack.Diversity React Template] - 400 in 'getExams': ${err}`);
        return res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!exams.length) {
        console.error(`[Hack.Diversity React Template] - 404 in 'getExams': Exams not found`);
        return res.status(200).json({
          success: true,
          exams: [],
        });
      }
      console.log(`[Hack.Diversity React Template] - 200 in 'getExams': Exams fetched!`);
      return res.status(200).json({
        success: true,
        exams: exams,
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'getExams': ${err}`);
      console.error(err);
      return res.status(404).json({
        success: false,
        error: err,
      });
    });
};

//to be getExamById
getexamById = async (req, res) => {
  await exam
    .find({ _id: req.params.id }, (err, exam) => {
      if (err) {
        console.error(`[Hack.Diversity React Template] - 400 in 'getexamById': ${err}`);
        throw res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!exam.length) {
        console.error(
          `[Hack.Diversity React Template] - 404 in 'getexamById': exam not found`,
        );
        return res.status(404).json({
          success: false,
          error: 'exam not found',
        });
      }
      console.log(`[Hack.Diversity React Template] - 200 in 'getexamById': exam fetched!`);
      return res.status(200).json({
        success: true,
        exam: exam[0],


      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'getexamById': ${err}`);
      console.error(err);
      return err;
    });
};


createOneExam = (req, res) => {


  const body = req.body;
  // console.log('----------------------- createexam: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createexam: body -----------------------')
  // console.log(body);
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a exam.',
    });
  }
  const exam = new exam(body);

  if (!exam) {

    console.error(
      `[Hack.Diversity React Template] - 400 in 'createexam': 'exam' is malformed.`,
    );

    return res.status(400).json({
      success: false,
      message: "'exam' is malformed",
    });
  }

  // console.log('----------------------- createexam: exam -----------------------')
  // console.log(exam);

  return exam
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createExam': exam created!`);
      return res.status(201).json({
        success: true,
        id: patient._id,//i do not know what to throw here yet. leaving it as is
        message: 'exam created!',
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'createExam'`);
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

updateOneExam = async (req, res) => {
  const {patient_Id, exam_Id, png_filename, key_findings} = req.body;
  if (!body) {

    console.error(
      `[Hack.Diversity React Template] - 400 in 'updateOneExam': You must provide a exam to update.`,
    );
    return res.status(400).json({
      success: false,
      error: 'You must provide an exam to update.',
    });
  }
  //changed to match Yams's test controllers
  const examForUpdate = {
    _id: req.params.id, 
    patient_Id = patient_Id,
    exam_Id =  exam_Id,
    png_filename = png_filename,
    key_findings = key_findings,
  };

  // console.log('----------------------- updateOneExam: res -----------------------');
  // console.log(res);

  try {
    await exam.findOneAndUpdate({ _id: req.params.id }, examForUpdate);
  } catch (err) {
    console.error(`[Hack.Diversity React Template] - caught error in 'updateOneExam': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`[Hack.Diversity React Template] - 200 in 'updateOneExam': exam updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: 'exam updated!',
  });
};

deleteOneExam = async (req, res) => {
  await exam
    .findOneAndDelete({ _id: req.params.id }, (err, exam) => {
      if (err) {
        console.error(`[Hack.Diversity React Template] - 400 in 'deleteOneExam': ${err}`);
        return res.status(400).json({
          succes: false,
          error: err,
        });
      }

      if (!exam) {
        console.error(
          `[Hack.Diversity React Template] - 400 in 'deleteOneExam': exam not found!`,
        );
        return res.status(400).json({
          success: false,
          error: 'exam not found!',
        });
      }

      return res.status(200).json({
        success: true,
        exam: exam,
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'deleteOneExam': ${err}`);
      console.error(err);
      return err;
    });

};

module.exports = {
  //createExam,
  getExams,
  getexamById,
  createOneExam,
  updateOneExam,
  deleteOneExam,

};

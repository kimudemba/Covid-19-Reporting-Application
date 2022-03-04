const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema(
  {
    patient_Id: {
      type: String,
      required: true,
      ref: 'Patient', //references Patient model
    },

    //Diag to img study (days) String
    Diag_to_img_study_days: {
      type: String,
      required: false, //changed
    },

    //Diagnosis to Imaging time (hrs) String
    Diagnosis_to_Imaging_time_hrs: {
      type: String,
      required: false, //changed
    },

    //Image Study Description
    Image_Study_Description: {
      type: String,
      required: false, //changed
    },

    //study modality
    study_modality: {
      type: String,
      required: false, //changed
    },

    //FIO2 @ time of img study
    FIO2_at_time_of_img_study: {
      type: String,
      required: false, //changed
    },

    //key_findings
    key_findings: {
      type: String,
      required: true,
    },

    //png_filename
    png_filename: {
      type: String,
      required: true,
    },

    //exam_Id
    exam_Id: {
      type: String,
      required: true,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model('exams', Exam);

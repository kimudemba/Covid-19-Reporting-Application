const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Exam = new Schema(
    {
        patient_Id: {
            type: String,
            required: true
        },

        //Diag to img study (days) String
        Diag_to_img_study_days: {
            type: String,
            required: true
        },

        //Diagnosis to Imaging time (hrs) String
        Diagnosis_to_Imaging_time_hrs: {
            type: String,
            required: true
        },

        //Image Study Description
        Image_Study_Description: {
            type: String,
            required: true
        },
      
        //study modality
        study_modality: {
            type: String,
            required: true
        },

        //FIO2 @ time of img study
        FIO2_at_time_of_img_study: {
            type: String,
            required: true
        },

        //key_findings
        key_findings: {
            type: String,
            required: true
        },

        //png_filename
        png_filename: {
            type: String,
            required: true
        },

        //exam_Id
        exam_Id: {
            type: String,
            required: true
        },
    },
    
    { timestamps: true },
);

module.exports = mongoose.model('exams', Exam);
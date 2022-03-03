const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema(
  {
    //PATIENT_ID
    PATIENTID: {
      type: String,
      required: true,
    },

    //added below key findings exam id and png filename
    exam_Id: {
      type: String,
      required: true,
      ref: 'Exam', //references Exam model
    },

    key_findings: {
      type: String,
      required: true,
      ref: 'Exam', //references Exam model
    },

    png_filename: {
      type: String,
      required: true,
      ref: 'Exam', //references Exam model
    },

    //AGE
    AGE: {
      type: String,
      required: true,
    },

    //SEX
    SEX: {
      type: String,
      required: true,
    },

    //RACE
    RACE: {
      type: String,
      required: false, //change
    },

    //ZIP
    ZIP: {
      type: String,
      required: true,
    },

    //LATEST_BMI
    LATEST_BMI: {
      type: String,
      required: true,
    },

    //LATEST WEIGHT
    LATEST_WEIGHT: {
      type: String,
      required: false, //change
    },

    //LATEST HEIGHT
    LATEST_HEIGHT: {
      type: String,
      required: false, //change
    },

    //TUBERCULOSIS
    TUBERCULOSIS: {
      type: String,
      required: false, //change
    },

    //SYSTEMIC LUPUS ERYTHMATOSUS
    SYSTEMIC_LUPUS_ERYTHMATOSUS: {
      type: String,
      required: false, //change
    },

    //RHEUMATOID ARTHRITIS
    RHEUMATOID_ARTHRITIS: {
      type: String,
      required: false, //change
    },

    //EXTENSIVE BURNS
    EXTENSIVE_BURNS: {
      type: String,
      required: false, //change
    },

    //ASPLENIA
    ASPLENIA: {
      type: String,
      required: false, //change
    },

    //HYPOSPLENIA
    HYPOSPLENIA: {
      type: String,
      required: false, //change
    },

    //MEASLES
    MEASLES: {
      type: String,
      required: false, //change
    },

    //CYTOMEGALOVIRUS
    CYTOMEGALOVIRUS: {
      type: String,
      required: false, //change
    },

    //CHICKEN POX
    CHICKEN_POX: {
      type: String,
      required: false, //change
    },

    //HERPES ZOSTER
    HERPES_ZOSTER: {
      type: String,
      required: false, //change
    },

    //MALNUTRITION
    MALNUTRITION: {
      type: String,
      required: false, //change
    },

    //CURRENT PREGNANT
    CURRENT_PREGNANT: {
      type: String,
      required: false, //change
    },

    //CHRONIC KIDNEY DISEASE
    CHRONIC_KIDNEY_DISEASE: {
      type: String,
      required: false, //change
    },

    //DIABETES TYPE I
    DIABETES_TYPE_I: {
      type: String,
      required: false, //change
    },

    //DIABETES TYPE II
    DIABETES_TYPE_II: {
      type: String,
      required: false, //change
    },

    //TRANSPLANT
    TRANSPLANT: {
      type: String,
      required: false, //change
    },

    //HEMODIALYSIS Pre Diagnosis
    HEMODIALYSIS_Pre_Diagnosis: {
      type: String,
      required: false, //change
    },

    //HEMODIALYSIS Post diagnosis
    HEMODIALYSIS_Post_diagnosis: {
      type: String,
      required: false, //change
    },

    //CANCER
    CANCER: {
      type: String,
      required: false, //change
    },

    //COVID TEST POSITIVE
    COVID_TEST_POSITIVE: {
      type: String,
      required: false, //change
    },

    //TEST NAME
    TEST_NAME: {
      type: String,
      required: false, //change
    },

    //ICU Admit
    ICU_Admit: {
      type: String,
      required: false, //change
    },

    //# ICU admits
    number_of_ICU_admits: {
      type: String,
      required: false, //change
    },

    //MORTALITY
    MORTALITY: {
      type: String,
      required: false, //change
    },
  },

  { timestamps: true },
);
module.exports = mongoose.model('patients', Patient);

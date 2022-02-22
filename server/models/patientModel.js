const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema(
    {
        //PATIENT_ID
        PATIENT_ID: {
            type: String,
            required: true
        },

        //AGE
        AGE: {
            type: String,
            required: true
        },

        //SEX
        SEX: {
            type: String,
            required: true
        },

        //RACE
        RACE: {
            type: String,
            required: true
        },
        
        //ZIP
        ZIP: {
            type: String,
            required: true
        },
       
        //LATEST_BMI
        LATEST_BMI: {
            type: String,
            required: true
        },

        //LATEST WEIGHT
        LATEST_WEIGHT: {
            type: String,
            required: true
        },

        //LATEST HEIGHT
        LATEST_HEIGHT: {
            type: String,
            required: true
        },

        //TUBERCULOSIS
        TUBERCULOSIS: {
            type: String,
            required: true
        },

        //SYSTEMIC LUPUS ERYTHMATOSUS
        SYSTEMIC_LUPUS_ERYTHMATOSUS: {
            type: String,
            required: true
        },

        //RHEUMATOID ARTHRITIS
        RHEUMATOID_ARTHRITIS: {
            type: String,
            required: true
        },

        //EXTENSIVE BURNS
        EXTENSIVE_BURNS: {
            type: String,
            required: true
        },

        //ASPLENIA
        ASPLENIA: {
            type: String,
            required: true
        },

        //HYPOSPLENIA
        HYPOSPLENIA: {
            type: String,
            required: true
        },

        //MEASLES
        MEASLES: {
            type: String,
            required: true
        },

        //CYTOMEGALOVIRUS
        CYTOMEGALOVIRUS: {
            type: String,
            required: true
        },

        //CHICKEN POX
        CHICKEN_POX: {
            type: String,
            required: true
        },

        //HERPES ZOSTER
        HERPES_ZOSTER: {
            type: String,
            required: true
        },

        //MALNUTRITION
        MALNUTRITION: {
            type: String,
            required: true
        },

        //CURRENT PREGNANT
        CURRENT_PREGNANT: {
            type: String,
            required: true
        },

        //CHRONIC KIDNEY DISEASE
        CHRONIC_KIDNEY_DISEASE: {
            type: String,
            required: true
        },

        //DIABETES TYPE I
        DIABETES_TYPE_I: {
            type: String,
            required: true
        },

        //DIABETES TYPE II
        DIABETES_TYPE_II: {
            type: String,
            required: true
        },

        //TRANSPLANT
        TRANSPLANT: {
            type: String,
            required: true
        },

        //HEMODIALYSIS Pre Diagnosis
        HEMODIALYSIS_Pre_Diagnosis: {
            type: String,
            required: true
        },

        //HEMODIALYSIS Post diagnosis
        HEMODIALYSIS_Post_diagnosis: {
            type: String,
            required: true
        },

        //CANCER
        CANCER: {
            type: String,
            required: true
        },

        //COVID TEST POSITIVE
        COVID_TEST_POSITIVE: {
            type: String,
            required: true
        },

        //TEST NAME
        TEST_NAME: {
            type: String,
            required: true
        },

        //ICU Admit
        ICU_Admit: {
            type: String,
            required: true
        },

        //# ICU admits
        #_ICU_admits: {
            type: String,
            required: true
        },

        //MORTALITY
        MORTALITY: {
            type: String,
            required: true
        },




    },

    { timestamps: true },

);
module.exports = mongoose.model('patients', Patient);


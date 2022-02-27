import { ExamTableFilter } from "./components/ExamSpecificComp/ExamTableFilter";

export const Columns = [
    {
      Header: "Patient ID",
      accessor: "patient_Id",
      Filter: ExamTableFilter,
    },
    {
      Header: "Exam ID",
      accessor: "exam_Id",
      Filter: ExamTableFilter,
    },
    {
      Header: "Xray Image",
      accessor: "png_filename",
      Filter: ExamTableFilter,
    },
    {
      Header: "Brixia Scores",
      accessor: "brixia_scores",
      Filter: ExamTableFilter,
    },
    {
      Header: "AGE",
      accessor: "AGE",
      Filter: ExamTableFilter,
    },
    {
      Header: "SEX",
      accessor: "SEX",
      Filter: ExamTableFilter,
    },
    {
      Header: "LATEST BMI",
      accessor: "LATEST_BMI",
      Filter: ExamTableFilter,
    },
    {
      Header: "ZIP",
      accessor: "ZIP",
      Filter: ExamTableFilter,
    },
  ];
  
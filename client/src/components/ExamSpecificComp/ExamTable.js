import React from 'react';

export default function ExamTable({ data, data2 }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Exam ID</th>
            <th>Xray Image</th>
            <th>Brixia Scores</th>
            <th>AGE</th>
            <th>SEX</th>
            <th>LATEST BMI</th>
            <th>ZIP</th>
          </tr>
        </thead>
        <tbody>
          {data.map((exam, id) => (
            <tr key={id} style={{ textAlign: 'left' }}>
              <td>{exam.patient_Id}</td>
              <td>{exam.exam_Id}</td>
              <td>{exam.png_filename}</td>
            </tr>
          ))}
          {data2.map((patient, id) => (
            <tr key={id} style={{ textAlign: 'left' }}>
              <td>{patient.AGE}</td>
              <td>{patient.SEX}</td>
              <td>{patient.ZIP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { DeleteButton } from '../components/buttons';
import api from '../api';

import MaUTable from '@material-ui/core/Table';
import { CssBaseline, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;

  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;

const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow data-row-exam-id={row.values._id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

class ExamTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      columns: [],
      
    };
  }

  componentDidMount() {
    console.log('ExamList: props');
    console.log(this.props);

    this.fetchAllExams();
  }

  fetchAllExams = () => {
    api
      .getAllExams()
      .then(resp => {
        const { exams } = resp.data;
        console.log('getAllExams: resp');
        console.log(exams);
        this.setState({ exams });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllExams': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSingleExam = examId => {
    return api
      .deleteExamById(examId)
      .then(resp => {
        console.log('deleteExamById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSingleExam': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleRemoveExam = data => {
    const examId = data;

    this.deleteSingleExam(examId).then(resp => {
      console.log('handleRemoveExam: resp');
      console.log(resp);
      this.fetchAllExams();
    });
  };

  render() {
    const exams = this.state.exams || {};
    
    const columns = [
      {
        Header: 'ID',
        accessor: '._id',
        //filterable: true,
       Cell: props => {
          const { original } = props.cell.row;
          return <span data-patient-id={original._id}>{original._id}</span>; 
        },
      },
      {
        Header: 'Patient',
        accessor: 'patient_Id',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-patient_Id={original.patient_Id}>{original.patient_Id})</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'exam_Id',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <Link><span data-exam_Id={original.exam_Id}>{original.exam_Id}</span></Link>;
        },
      },
      {
        Header: 'Image',
        accessor: 'png_filename',
        //filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return<span data-png_filename={original.png_filename}>{original.png_filename}</span>;
        },
      },
      {
        Header: 'Key Findings',
        accessor: 'key_findings',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-key_findings={original.key_findings}>{original.key_findings}</span>
        },
      },
      {
        Header: 'FIO2',
        accessor: 'FIO2_at_time_of_img_study',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-FIO2_at_time_of_img_study={original.FIO2_at_time_of_img_study}>{original.FIO2_at_time_of_img_study}</span>;
        },
      },
      {
        Header: 'Diagnosis',
        accessor: 'FDiagnosis_to_Imaging_time_hrs',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-Diagnosis_to_Imaging_time_hrs={original.Diagnosis_to_Imaging_time_hrs}>{original.Diagnosis_to_Imaging_time_hrs}</span>;
        },
      },
      {
        Header: 'Image Study',
        accessor: 'Image_Study_Description',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-Image_Study_Description={original.Image_Study_Description}>{original.Image_Study_Description}</span>;
        },
      },
      {
        Header: 'Study Modality',
        accessor: 'study_modality',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-study_modality={original.study_modality}>{original.study_modality}</span>;
        },
      },
      {
        Header: 'Update',
        accessor: '_update',
        Cell: props => {
          const { original } = props.cell.row;

          return (
            <Link data-update-id={original._id} to={`/exam/update/${original._id}`}>
              Update
            </Link>
          );
        },
      },
      {
        Header: 'Delete',
        accessor: '_delete',
        Cell: props => {
          const { original } = props.cell.row;
          return (
            <span data-delete-id={original._id}>
              <DeleteButton id={original._id} onDelete={this.handleRemoveExam} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        <CssBaseline />
        {(exams || []).length > 0 ? (
          <Table data={exams} columns={columns} />
        ) : (
          `No exams to render... :(`
        )}
      </Wrapper>
    );
  }
}

export default ExamTable;

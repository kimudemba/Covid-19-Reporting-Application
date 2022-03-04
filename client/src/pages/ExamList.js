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
        accessor: 'PATIENTID',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-patient-id={original.PATIENTID}>{original.PATIENTID})</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'name',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.exam}>{props.value}</span>;
        },
      },
      {
        Header: 'Image',
        accessor: 'png_filename',
        //filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-png_filename={original.png_filename}>{original.png_filename}</span>;
        },
      },
      {
        Header: 'Key Findings',
        accessor: 'timeframeNote',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-timeframe={original.timeframeNote}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Age',
        accessor: 'AGE',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-priority={original.AGE}>{original.AGE}</span>;
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

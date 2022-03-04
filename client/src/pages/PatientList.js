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
            <TableRow data-row-patient-id={row.values._id} {...row.getRowProps()}>
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

class PatientTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      columns: [],
      
    };
  }

  componentDidMount() {
    console.log('PatientList: props');
    console.log(this.props);

    this.fetchAllPatients();
  }

  fetchAllPatients = () => {
    api
      .getAllPatients()
      .then(resp => {
        const { patients } = resp.data;
        console.log('getAllPatients: resp');
        console.log(patients);
        this.setState({ patients });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllPatients': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSinglePatient = patientId => {
    return api
      .deletePatientById(patientId)
      .then(resp => {
        console.log('deletePatientById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSinglePatient': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleRemovePatient = data => {
    const patientId = data;

    this.deleteSinglePatient(patientId).then(resp => {
      console.log('handleRemovePatient: resp');
      console.log(resp);
      this.fetchAllPatients();
    });
  };

  render() {
    const patients = this.state.patients || {};
    
    const columns = [
     /* {
        Header: 'ID',
        accessor: '._id',
        //filterable: true,
       Cell: props => {
          const { original } = props.cell.row;
          return <span data-patient-id={original._id}>{original._id}</span>; 
        },
      },*/
      {
        Header: 'Patient',
        accessor: 'PATIENTID',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <Link><span data-PATIENTID={original.PATIENTID}>{original.PATIENTID}</span></Link>
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'exam_Id',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-exam_Id={original.exam_Id}>{original.exam_Id}</span>;
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
     /* {
        Header: 'Image',
        accessor: 'daysOfWeek',
        // filterable: true,
        Cell: props => {
          const { daysOfWeek } = props.cell.row.original;
          let daysToDisplay = '';
          if (daysOfWeek && typeof daysOfWeek === 'object') {
            for (const day in daysOfWeek) {
              daysToDisplay =
                daysToDisplay === '' ? daysOfWeek[day] : `${daysToDisplay}, ${daysOfWeek[day]}`;
            }
          }
          return (
            <span
              data-daysofweek={daysOfWeek && JSON.stringify(daysOfWeek)}
              data-daysofweek-by-id={props.value}>
              {daysToDisplay || '-'}
            </span>
          );
        },
      },*/
      {
        Header: 'Key Findings',
        accessor: 'key_findings',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-key_findings={original.key_findings}>{original.key_findings}</span>;
        },
      },
      {
        Header: 'Age',
        accessor: 'AGE',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-AGE={original.AGE}>{original.AGE}</span>;
        },
      },
      {
        Header: 'Sex',
        accessor: 'SEX',
        //filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-SEX={original.SEX}>{original.SEX}</span>;
        },
      },
  
      {
        Header: 'Weight',
          accessor: 'weight',
          //filterable: true,
          Cell: props => {
            const { original } = props.cell.row;
            return <span data-LATEST_WEIGHT={original.LATEST_WEIGHT}>{original.LATEST_WEIGHT}</span>;
          },
        },
      {
        Header: 'Update',
        accessor: '_update',
        Cell: props => {
          const { original } = props.cell.row;

          return (
            <Link data-update-id={original._id} to={`/patient/update/${original._id}`}>
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
              <DeleteButton id={original._id} onDelete={this.handleRemovePatient} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        <CssBaseline />
        {(patients || []).length > 0 ? (
          <Table data={patients} columns={columns} />
        ) : (
          `No patients to render... :(`
        )}
      </Wrapper>
    );
  }
}

export default PatientTable;

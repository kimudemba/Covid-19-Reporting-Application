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
    console.log(patients);

    const columns = [
      {
        Header: 'Patient',
        accessor: 'patientId',
        // filterable: true,
        Cell: props => {
          console.log(props);
          const { original } = props.cell.row;
          return <span data-patient-id={original.patientId}>{props.value}</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'name',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.name}>{props.value}</span>;
        },
      },
      {
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
        accessor: 'priority',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-priority={original.priority}>{props.value}</span>;
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

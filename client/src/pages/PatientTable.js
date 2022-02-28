import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import { DeleteButton } from '../components/buttons';
import api from '../api';

import styled from 'styled-components';

import 'react-table-6/react-table.css';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

/*class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }*/

  class PatientList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        patients: [],
        columns: [],
        isLoading: false,
      };
    }

  componentDidMount() {
    console.log('PatientList: props');
    console.log(this.props);
    // if (((this.props.itemData || {}).items || []).length) return; 

     
   

    this.fetchAllPatients();
  }

  fetchAllPatients = () => {

    /*Faking this for now. Once we have the backend API set up we can use this function to make the HTTP request instead using api.getAllItems()...
  this.setState({
    items: [fakeItem1, fakeItem2, ...PATIENT_ID , AGE ,SEX, RACE, ZIP, BMI, WEIGHT, HEIGHT]
} */
    /* api
      .getAllItems()
      .then(resp => {
        debugger;
        const { items } = resp.data;
        console.log('getAllItems: resp');
        console.log(items); */
    
        //const firstPatient = {PATIENT_ID, AGE, RACE, SEX, LATEST_BMI, LATEST_WEIGHT, LATEST_HEIGHT,TUBERCULOSIS };
        const secondPatient = {patientID: 'COVID-234', examID: '3333', age: 60, zip: 2940, weight: 120, bmi: 20 };
        const patients = [secondPatient];
        const dataForState = { patients: patients}; 
        this.setState(dataForState); 

      }

      /*.catch(err => {
        console.error(`ERROR in 'getAllItems': ${err}`);
        console.error(err);
        return err;
      }); */

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
        Header: 'ID',
        accessor: '_id',
        filterable: true,
        Cell: props => {
          return <span data-item-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Patient ID',
        accessor: 'patientID',
        filterable: true,
        Cell: props => {
          return <span data-item-id={props.original.patientID}>{props.original.patientID}</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'examID',
        filterable: true,
        Cell: props => {
          return <span data-name={props.original.examID}>{props.original.examID}</span>;
        },
      },
      {
        Header: 'Image',
        accessor: 'daysOfWeek',
        filterable: true,
        Cell: props => {
          const { daysOfWeek } = props.original;
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
              data-daysofweek-by-id={props.original._id}>
              {daysToDisplay || '-'}
            </span>
          );
        },
      },
      {
        Header: 'Key Findings',
        accessor: 'timeframeNote',
        Cell: props => {
          return <span data-timeframe={props.original.timeframeNote}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Age',
        accessor: 'age',
        filterable: true,
        Cell: props => {
          return <span data-priority={props.original.priority}>{props.value}</span>;
        },
      },
      {
      Header: 'Zip code',
        accessor: 'zip',
        filterable: true,
        Cell: props => {
          return <span data-priority={props.original.priority}>{props.value}</span>;
        },
      },
      {
        Header: 'Weight',
          accessor: 'weight',
          filterable: true,
          Cell: props => {
            return <span data-priority={props.original.priority}>{props.value}</span>;
          },
        },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <Link data-update-id={props.original._id} to={`/patient/update/${props.original._id}`}>
              Update Item
            </Link>
          );
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <span data-delete-id={props.original._id}>
              <DeleteButton id={props.original._id} onDelete={this.handleRemoveItem} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        {(patients || []).length > 0 ? ( // defeats the purpose of using `isLoading` prop?
          <ReactTable
            data={patients}
            columns={columns}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={10}
          />
        ) : (
          `No items to render... :(`
        )}
      </Wrapper>
    );
  }
}

//export default ItemsList;
export default PatientList;

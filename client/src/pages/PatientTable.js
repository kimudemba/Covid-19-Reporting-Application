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
        patients:{}
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
    api
      .getAllPatients()
      .then(resp => {
        debugger;
        const { patients } = resp.data;
        console.log('getAllPatients: resp');
        console.log(patients);
        this.setState({patients}); 
    
        //const firstPatient = {PATIENT_ID, AGE, RACE, SEX, LATEST_BMI, LATEST_WEIGHT, LATEST_HEIGHT,TUBERCULOSIS };
        /*const secondPatient = {patientID: 'COVID-234', examID: '3333', age: 60, zip: 2940, weight: 120, bmi: 20 };
        const patients = [secondPatient];
        const dataForState = { patients: patients}; 
        this.setState(dataForState); */

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
      /*{
        Header: 'ID',
        accessor: '._id',
        filterable: true,
        Cell: props => {
          return <span data-item-id={props.original._id}>{props.original._id}</span>;
        },
      },*/
      {
        Header: 'Patient ID',
        accessor: 'PATIENTID',
        //filterable: true,
        Cell: props => {
          return <Link><span data-PATIENTID={props.original.PATIENTID}>{props.original.PATIENTID}</span></Link>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'exam_Id',
        //filterable: true,
        Cell: props => {
          return <Link><span data-exam_Id={props.original.exam_Id}>{props.original.exam_Id}</span></Link>
        },
      },

      {
        Header: 'Image',
        accessor: 'png_filename',
        //filterable: true,
        Cell: props => {
          return <span data-png_filename={props.original.png_filename}>{props.original.png_filename}</span>;
        },
      },
      /*{
        Header: 'Image',
        accessor: 'daysOfWeek',
        filterable: true,
        Cell: props => {
          
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
      },*/
      {
        Header: 'Key Findings',
        accessor: 'key_findings',
        Cell: props => {
          return <span data-key_findings={props.original.key_findings}>{props.original.key_findings}</span>;
        },
      },
      {
        Header: 'Age',
        accessor: 'AGE',
        //filterable: true,
        Cell: props => {
          return <span data-AGE={props.original.AGE}>{props.original.AGE}</span>;
        },
      },
      {
        Header: 'Sex',
        accessor: 'SEX',
        //filterable: true,
        Cell: props => {
          return <span data-SEX={props.original.SEX}>{props.original.SEX}</span>;
        },
      },
  
      {
        Header: 'Weight',
          accessor: 'weight',
          //filterable: true,
          Cell: props => {
            return <span data-LATEST_WEIGHT={props.original.LATEST_WEIGHT}>{props.original.LATEST_WEIGHT}</span>;
          },
        },
        {
          Header: 'Zip code',
            accessor: 'ZIP',
            //filterable: true,
            Cell: props => {
              return <span data-ZIP={props.original.ZIP}>{props.original.ZIP}</span>;
            },
          },
          {
            Header: 'Covid Positive',
             accessor: 'COVID_TEST_POSITIVE',
              //filterable: true,
              Cell: props => {
                return <span data-COVID_TEST_POSITIVE={props.original.COVID_TEST_POSITIVE}>{props.original.COVID_TEST_POSITIVE}</span>;
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
            defaultPageSize={20}
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

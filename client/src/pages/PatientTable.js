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
             Header: 'MORTALITY',
             accessor: 'MORTALITY',
                //filterable: true,
                Cell: props => {
                  return <span data-MORTALITY={props.original.MORTALITY}>{props.original.MORTALITY}</span>;
                },
           },


          {
                Header: 'Height',
                 accessor: 'LATEST_HEIGHT',
                  //filterable: true,
                  Cell: props => {
                    return <span data-LATEST_HEIGHT={props.original.LATEST_HEIGHT}>{props.original.LATEST_HEIGHT}</span>;
                  },
           },

           {
                Header: 'BMI',
                 accessor: 'LATEST_BMI',
                  //filterable: true,
                  Cell: props => {
                    return <span data-LATEST_BMI={props.original.LATEST_BMI}>{props.original.LATEST_BMI}</span>;
                },
              },


           {
                Header: 'Tuberculosis',
                 accessor: 'TUBERCULOSIS',
                  //filterable: true,
                  Cell: props => {
                    return <span data-TUBERCULOSIS={props.original.TUBERCULOSIS}>{props.original.TUBERCULOSIS}</span>;
                },
           },
        
      {
            Header: 'SYSTEMIC_LUPUS_ERYTHMATOSUS',
             accessor: 'SYSTEMIC_LUPUS_ERYTHMATOSUS',
              //filterable: true,
              Cell: props => {
                return <span data-SYSTEMIC_LUPUS_ERYTHMATOSUS={props.original.SYSTEMIC_LUPUS_ERYTHMATOSUS}>{props.original.SYSTEMIC_LUPUS_ERYTHMATOSUS}</span>;
            },
       },

      {
        Header: 'RHEUMATOID_ARTHRITIS',
         accessor: 'RHEUMATOID_ARTHRITIS',
          //filterable: true,
          Cell: props => {
            return <span data-RHEUMATOID_ARTHRITIS={props.original.RHEUMATOID_ARTHRITIS}>{props.original.RHEUMATOID_ARTHRITIS}</span>;
        },
     },

     
     {
      Header: 'EXTENSIVE_BURNS',
       accessor: 'EXTENSIVE_BURNS',
        //filterable: true,
        Cell: props => {
          return <span data-EXTENSIVE_BURNS={props.original.EXTENSIVE_BURNS}>{props.original.EXTENSIVE_BURNS}</span>;
        },
      },

      {
        Header: 'ASPLENIA',
         accessor: 'ASPLENIA',
          //filterable: true,
          Cell: props => {
            return <span data-ASPLENIA={props.original.ASPLENIA}>{props.original.ASPLENIA}</span>;
        },
     },

     {
      Header: 'HYPOSPLENIA',
       accessor: 'HYPOSPLENIA',
        //filterable: true,
        Cell: props => {
          return <span data-HYPOSPLENIA={props.original.HYPOSPLENIA}>{props.original.HYPOSPLENIA}</span>;
       },
     },
    
    
     {
      Header: 'MEASLES',
       accessor: 'MEASLES',
        //filterable: true,
        Cell: props => {
          return <span data-MEASLES={props.original.MEASLES}>{props.original.MEASLES}</span>;
       },
     }, 
     
     {
      Header: 'CYTOMEGALOVIRUS',
       accessor: 'CYTOMEGALOVIRUS',
        //filterable: true,
        Cell: props => {
          return <span data-CYTOMEGALOVIRUS={props.original.CYTOMEGALOVIRUS}>{props.original.CYTOMEGALOVIRUS}</span>;
       },
     }, 

      {
      Header: 'Chicken Pox',
       accessor: 'CHICKEN_POX',
        //filterable: true,
        Cell: props => {
          return <span data-CHICKEN_POX={props.original.CHICKEN_POX}>{props.original.CHICKEN_POX}</span>;
       },
     },
     
     {
      Header: 'HERPES_ZOSTER',
       accessor: 'HERPES_ZOSTER',
        //filterable: true,
        Cell: props => {
          return <span data-HERPES_ZOSTER={props.original.HERPES_ZOSTER}>{props.original.HERPES_ZOSTER}</span>;
       },
     },
     
     {
      Header: 'MALNUTRITION',
       accessor: 'MALNUTRITION',
        //filterable: true,
        Cell: props => {
          return <span data-MALNUTRITION={props.original.MALNUTRITION}>{props.original.MALNUTRITION}</span>;
       },
     },


     {
      Header: 'CURRENT_PREGNANT',
       accessor: 'CURRENT_PREGNANT',
        //filterable: true,
        Cell: props => {
          return <span data-CURRENT_PREGNANT={props.original.CURRENT_PREGNANT}>{props.original.CURRENT_PREGNANT}</span>;
       },
     },

     {
      Header: 'CHRONIC_KIDNEY_DISEASE',
       accessor: 'CHRONIC_KIDNEY_DISEASE',
        //filterable: true,
        Cell: props => {
          return <span data-CHRONIC_KIDNEY_DISEASE={props.original.CHRONIC_KIDNEY_DISEASE}>{props.original.CHRONIC_KIDNEY_DISEASE}</span>;
       },
     },
     
     {
      Header: 'DIABETES TYPE I',
       accessor: 'DIABETES_TYPE_I',
        //filterable: true,
        Cell: props => {
          return <span data-DIABETES_TYPE_I={props.original.DIABETES_TYPE_I}>{props.original.DIABETES_TYPE_I}</span>;
       },
     },

     {
      Header: 'DIABETES TYPE II',
       accessor: 'DIABETES_TYPE_II',
        //filterable: true,
        Cell: props => {
          return <span data-DIABETES_TYPE_II={props.original.DIABETES_TYPE_II}>{props.original.DIABETES_TYPE_II}</span>;
       },
     },

     {
      Header: 'TRANSPLANT',
       accessor: 'TRANSPLANT',
        //filterable: true,
        Cell: props => {
          return <span data-TRANSPLANT={props.original.TRANSPLANT}>{props.original.TRANSPLANT}</span>;
       },
     },
        
     {
      Header: 'HEMODIALYSIS_Pre_Diagnosis',
       accessor: 'HEMODIALYSIS_Pre_Diagnosis',
        //filterable: true,
        Cell: props => {
          return <span data-HEMODIALYSIS_Pre_Diagnosis={props.original.HEMODIALYSIS_Pre_Diagnosis}>{props.original.HEMODIALYSIS_Pre_Diagnosis}</span>;
       },
     },

     {
      Header: 'HEMODIALYSIS_Post_diagnosis',
       accessor: 'HEMODIALYSIS_Post_diagnosis',
        //filterable: true,
        Cell: props => {
          return <span data-HEMODIALYSIS_Post_diagnosis={props.original.HEMODIALYSIS_Post_diagnosis}>{props.original.HEMODIALYSIS_Post_diagnosis}</span>;
       },
      },

      {
        Header: 'CANCER',
         accessor: 'CANCER',
          //filterable: true,
          Cell: props => {
            return <span data-CANCER={props.original.CANCER}>{props.original.CANCER}</span>;
         },
        },

        {
          Header: 'Test Name ',
           accessor: 'TEST_NAME',
            //filterable: true,
            Cell: props => {
              return <span data-TEST_NAME={props.original.TEST_NAME}>{props.original.TEST_NAME}</span>;
           },
        },

        {
          Header: 'ICU Admit',
           accessor: 'ICU_Admit',
            //filterable: true,
            Cell: props => {
              return <span data-ICU_Admit={props.original.ICU_Admit}>{props.original.ICU_Admit}</span>;
           },
        },
        
        {
          Header: 'Number_of_ICU_admits',
           accessor: 'number_of_ICU_admits',
            //filterable: true,
            Cell: props => {
              return <span data-number_of_ICU_admits
              ={props.original.number_of_ICU_admits
              }>{props.original.number_of_ICU_admits
              }</span>;
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
              <DeleteButton id={props.original._id} onClick={this.handleRemoveItem} />
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

//eddy: line 455
//export default ItemsList;
export default PatientList;

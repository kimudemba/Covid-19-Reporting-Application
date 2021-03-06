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

class ExamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: {},
      //columns: [],
     // isLoading: false,
    };
  }

  componentDidMount() {
    console.log('ExamList: props');
    console.log(this.props);
    // if (((this.props.itemData || {}).items || []).length) return;
    this.fetchAllExams();
  }

  fetchAllExams = () => {
    /*Faking this for now. Once we have the backend API set up we can use this function to make the HTTP request instead using api.getAllItems()...
  this.setState({
    items: [fakeItem1, fakeItem2, ...PATIENT_ID , AGE ,SEX, RACE, ZIP, BMI, WEIGHT, HEIGHT]
} */
     api
      .getAllExams()
      .then(resp => {
        debugger;
        const { exams } = resp.data;
        console.log('getAllExams: resp');
        console.log(exams); 
        this.setState({exams});
    // const firstExam = {PATIENT_ID, AGE, RACE, SEX, LATEST_BMI, LATEST_WEIGHT, LATEST_HEIGHT,TUBERCULOSIS };
    // const secondItem = {
    //   patient_Id: 'COVID-19-AR-16434409',
    //   key_findings: 'Subtle patchy bibasilar and right upper lobe airspace  opacities',
    //   png_filename: 'COVID-19-AR-16434409_XR_CHEST_AP_PORTABLE_1.png',
    //   exam_Id: 'Exam-1',
    // };
    // const exams = [firstExam];
    // const dataForState = { exams: exams};
    // this.setState(dataForState);
  })

  .catch(err => {
        console.error(`ERROR in 'getAllExams': ${err}`);
        console.error(err);
        return err;
      }); 
    }

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
    console.log(exams);

    const columns = [
      /*{
        Header: 'ID',
        accessor: '_id',
        filterable: true,
        Cell: props => {
          return <span data-item-id={props.original._id}>{props.original._id}</span>;
        },
      },*/

      {
        Header: 'patient_Id',
        accessor: 'patient_Id',
       // filterable: true,
        Cell: props => {
          return <Link><span data-patient_Id={props.original.patient_Id}>{props.original.patient_Id}</span></Link>;
        },
      },

      {
        Header: 'Exam ID',
        accessor: 'exam_Id',
        //filterable: true,
        Cell: props => {
          return <span data-exam_Id={props.original.exam_Id}>{props.original.exam_Id}</span>;
        },
      },

     /* {
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
      },*/


      {
        Header: 'Image',
        accessor: 'png_filename',
        //filterable: true,
        Cell: props => {
          //const { original } = props.cell.row;
        
          return <img src={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${props.original.png_filename}`} width={450} height={100} alt = 'exam' />
          
        },//https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/
      },
      
      {
        Header: 'Key Findings',
        accessor: 'key_findings',
        Cell: props => {
          return <span data-key_findings={props.original.key_findings}>{props.original.key_findings}</span>;
        },
      },

      {
        Header: 'Diag_to_img_study_days',
        accessor: 'Diag_to_img_study_days',
        Cell: props => {
          return <span data-Diag_to_img_study_days={props.original.Diag_to_img_study_days}>{props.original.Diag_to_img_study_days}</span>;
        },
      },

      {
        Header: 'Diagnosis_to_Imaging_time_hrs',
        accessor: 'Diagnosis_to_Imaging_time_hrs',
        Cell: props => {
          return <span data-Diagnosis_to_Imaging_time_hrs={props.original.Diagnosis_to_Imaging_time_hrs}>{props.original.Diagnosis_to_Imaging_time_hrs}</span>;
        },
      },

      {
        Header: 'Image_Study_Description',
        accessor: 'Image_Study_Description',
        Cell: props => {
          return <span data-Image_Study_Description={props.original.Image_Study_Description}>{props.original.Image_Study_Description}</span>;
        },
      },

      
      {
        Header: 'study_modality',
        accessor: 'study_modality',
        Cell: props => {
          return <span data-study_modality={props.original.study_modality}>{props.original.study_modality}</span>;
        },
      },


      /*{
        Header: 'FIO2_at_time_of_img_study',
        accessor: 'FIO2_at_time_of_img_study',
        Cell: props => {
          return <span data-FIO2_at_time_of_img_study={props.original.FIO2_at_time_of_img_study}>{props.original.FIO2_at_time_of_img_study}</span>;
        },
      },*/

      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <Link data-update-id={props.original._id} to={`/exam/update/${props.original._id}`}>
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
        {(exams || []).length > 0 ? ( // defeats the purpose of using `isLoading` prop?
          <ReactTable
            data={exams}
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
export default ExamList;

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
      {
        Header: 'ID',
        accessor: '_id',
        filterable: true,
        Cell: props => {
          return <span data-item-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'exam_Id',
        filterable: true,
        Cell: props => {
          return <span data-exam_Id={props.original.exam_Id}>{props.original.exam_Id}</span>;
        },
      },
      {
        Header: 'Image',
        accessor: 'png_filename',
        //filterable: true,
        Cell: props => {
          //const { original } = props.cell.row;
          return <url><span data-png_filename={props.original.png_filename}>{props.original.png_filename}</span></url>
        },//https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/
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
              <DeleteButton id={props.original._id} onDelete={this.handleRemoveItem} />
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
export default ExamList;

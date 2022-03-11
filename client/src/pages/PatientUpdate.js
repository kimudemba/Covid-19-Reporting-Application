import React, { Component } from 'react';
import api from '../api';
//import { shared } from '../constants';

import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
  max-width: 30%;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;
`;

/*const Fieldset = styled.fieldset.attrs({
  className: 'form-control',
})`
  border-color: transparent;
  margin: 1em auto 0.5em;
  max-width: 50%;
  min-height: 6em;
`;

const DayInput = styled.input.attrs({
  className: '',
})`
  margin: 5px auto;
  text-align: center;
`;
*/
const Button = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

class PatientUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _patientID: '',
      sex: '',
      keyFindings: '',
      bmi: 0,
      age: 0,
      race: '',
      zipcode: 0,
      weight: 0,
      examID: '',
    };
  }

  componentDidMount() {
    const patientId = this.props.match.params.id;
    this.fetchSinglePatient(patientId).then(resp => {
      const { patient } = undefined || {} || resp.data;
      this.setState({ ...patient });
      console.log(patient)
      
    });
  }

  fetchSinglePatient = patientId => {
    return api
      .getpatientById(patientId)
      .then(resp => {
        console.log('getpatientById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'fetchSinglePatient': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleChangeInputPatientID = async event => {
    const patientId = event.target.value;
    this.setState({ patientId });
  };

  /*handleChangeDays = async event => {
    const { checked } = event.target;
    const { dayIndex } = event.target.dataset;
    const { daysOfWeek } = this.state;
    const { DAYS_OF_WEEK } = shared;

    if (checked && !daysOfWeek[dayIndex]) {
      daysOfWeek[dayIndex] = DAYS_OF_WEEK[dayIndex];
    } else if (!checked && daysOfWeek[dayIndex]) {
      delete daysOfWeek[dayIndex];
    }
    this.setState({ daysOfWeek: daysOfWeek });
  };*/

  updateSinglePatient = patient => {
    return api
      .updatePatientyId(patient._id, patient)
      .then(resp => {
        console.log('updatePatient: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newPatient = JSON.parse(resp.config.data);
          console.log('newPatient: ', newPatient);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'updateSinglePatient': ${err}`);
        console.error(err);
        return err;
      });
  };
  handleChangeInputPatientID = async event => {
    const patientID = event.target.value;
    this.setState({ patientID });
  };

  handleChangeInputRace = async event => {
    const race = event.target.value;
    this.setState({ race });
  };
  handleChangeInputWeight = async event => {
    const weight = event.target.validity.valid ? event.target.value : this.state.weight;

    this.setState({ weight });
  };
  handleChangeInputZipCode = async event => {
    const zipcode = event.target.validity.valid ? event.target.value : this.state.zipcode;

    this.setState({ zipcode });
  };

  handleChangeInputAge = async event => {
    const age = event.target.value;
    this.setState({ age });
  };

  handleChangeInputBmi = async event => {
    const bmi = event.target.validity.valid ? event.target.value : this.state.bmi;

    this.setState({ bmi });
  };

  handleChangeInputSex = async event => {
    const sex = event.target.value;
    this.setState({ sex });
  };

  handleChangeInputKeyFindings = async event => {
    const keyFindings = event.target.value;
    this.setState({ keyFindings });
  };

  handleUpdatePatient = event => {
    const { _id, patientId, patientID, race, age, zipcode, bmi, weight, sex, keyFindings } = this.state;
    const patient = { _id, patientId,patientID, race, age, zipcode, bmi, sex, weight, keyFindings};

    return this.updateSinglePatient(patient)
      .then(resp => {
        console.log('handleUpdatePatient: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Patient updated successfully');
          return true;
        } else {
          throw resp;
        }
      })
      .catch(err => {
        window.alert(`There was an error updating the patient... :(`);
        console.error('handleUpdatePatient: err');
        console.error(err);
      });
  };

  confirmUpdatePatient = event => {
    if (window.confirm(`Are you sure you want to update this patient? ${this.state._id}`)) {
      return this.handleUpdatePatient(event);
    }
  };

  render() {
    const { _id, patientID, age, race, zipcode, bmi, sex, weight } = this.state;

    //const { DAYS_OF_WEEK } = shared;

    return (
      _id && (
        <Wrapper>
          <Title>Create Patient</Title>

          <Label>Patient ID: </Label>
          <InputText type="text" value={patientID} onChange={this.handleChangeInputPatientID} />


        <Label>Zip code: </Label>  {/* This used to be Priority */} 
        <InputText type="text" value={zipcode} onChange={this.handleChangeInputZipCode} />

          
        <Label>Age: </Label> {/* This used to be priority */} 
        <InputText type="text" value={age} onChange={this.handleChangeInputAge} />

        <Label>Race: </Label>
        <InputText type="text" value={race} onChange={this.handleChangeInputRace} />

        <Label>Weight: </Label> {/* This used to be priority */} 
        <InputText type="text" value={weight} onChange={this.handleChangeInputWeight} />

        <Label>Sex: </Label> {/* This used to be priority */} 
        <InputText type="text" value={sex} onChange={this.handleChangeInputSex} />
        <Label>BMI: </Label> {/* This used to be priority */} 
        <InputText type="text" value={bmi} onChange={this.handleChangeInputBmi} />

          

          {/*<Label>Content: </Label>
          <InputText type="textarea" value={content} onChange={this.handleChangeInputContent} />*/}


          <Button onClick={this.confirmUpdatePatient}>Update Patient</Button>
          <CancelButton href={'/patients'}>Cancel</CancelButton>
        </Wrapper>
      )
    );
  }
}

export default PatientUpdate;

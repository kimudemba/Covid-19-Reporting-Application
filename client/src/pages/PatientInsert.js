import React, { Component } from 'react';
//import { shared } from '../constants';
import api from '../api';

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

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

/*const Fieldset = styled.fieldset.attrs({
  className: 'form-control',
})`
  background-color: transparent;
  border-color: transparent;
  margin: 1em auto 0.5em;
  max-width: 50%;
  min-height: 6em;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const DayInput = styled.input.attrs({
  className: '',
})
  margin: 5px 5px 5px auto;
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

class PatientInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientID: '',
      sex: '',
      
      bmi: 0,
      age: 0,
      zipcode: 0,
      weight: 0,
      race: '',
    };
  }

  /*handleChangeInputName = async event => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleChangeDays = async event => {
    const { checked, value } = event.target;
    const { daysOfWeek } = this.state;
    const { DAYS_OF_WEEK } = shared;

    if (checked && !daysOfWeek[value]) {
      daysOfWeek[value] = DAYS_OF_WEEK[value];
    } else if (!checked && daysOfWeek[value]) {
      delete daysOfWeek[value];
    }
    this.setState({ daysOfWeek });
  };
*/
  handleChangeInputPatientID = async event => {
    const patientID = event.target.value;
    this.setState({ patientID });
  };

  handleChangeInputExamID = async event => {
    const examID = event.target.value;
    this.setState({ examID });
  };

  handleChangeInputRace = async event => {
    const race = event.target.value;
    this.setState({ race });
  };


  /*handleChangeInputPriority = async event => {
    const priority = event.target.validity.valid ? event.target.value : this.state.priority;

    this.setState({ priority });
  };*/

  handleChangeInputAge = async event => {
    const age = event.target.validity.valid ? event.target.value : this.state.age;

    this.setState({ age });
  };
  handleChangeInputWeight = async event => {
    const weight = event.target.validity.valid ? event.target.value : this.state.weight;

    this.setState({ weight });
  };
  handleChangeInputZipCode = async event => {
    const zipcode = event.target.validity.valid ? event.target.value : this.state.zipcode;

    this.setState({ zipcode });
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

  insertSingleItem = item => {
    return api
      .insertPatient(item)
      .then(resp => {
        console.log('insertItem: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newItem = JSON.parse(resp.config.data);
          console.log('insertItem: newItem', newItem);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'insertSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleInsertItem = event => {
    event.preventDefault();

    const {  age, race, zipcode, weight, bmi, sex, patientID} = this.state;
    const item = {  age, race, zipcode, weight, bmi, sex, patientID };

     this.insertSingleItem(item)
      .then(resp => {
        console.log('handleInsertItem: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Item inserted successfully');
          this.setState({
            patientID: '',
            sex: '',
            
            bmi: 0,
            age: 0,
            zipcode: 0,
            race: '',
            weight: 0,
          
          });
        } else {
          throw resp;
        }
      })
      .catch(err => {
        // TODO: pass error object correctly so that things like validation errors can be displayed to user
        window.alert(`There was an error creating the item... :(`);
        console.log('handleInsertItem: err');
        console.log(err);
      });
  };
  confirmUpdatePatient = event => {
    if (window.confirm(`Are you sure you want to update this patient? ${this.state._id}`)) {
      return this.handleUpdatePatient(event);
    }
  };


  render() {
    const { race, age, zipcode, weight, bmi, sex, patientID } = this.state;

    //const { DAYS_OF_WEEK } = shared;

    return (
      <Wrapper>
        <Title>Create Patient</Title>

        <Label>Patient ID: </Label>
          <InputText type="text" value={patientID} onChange={this.handleChangeInputPatientID} />
         

          {/*<Fieldset>
            <legend>Day(s) of the Week: </legend>
            {Object.keys(DAYS_OF_WEEK).map((dayInt, i) => (
              <React.Fragment key={DAYS_OF_WEEK[dayInt]}>
                <DayInput
                  type="checkbox"
                  id={DAYS_OF_WEEK[dayInt]}
                  className="day-checkbox-input"
                  defaultValue={daysOfWeek[dayInt] && daysOfWeek[dayInt] !== ''}
                  data-day-index={dayInt}
                  onChange={this.handleChangeDays}
                  defaultChecked={daysOfWeek[dayInt] && daysOfWeek[dayInt] !== ''}
                />
                <Label htmlFor={DAYS_OF_WEEK[dayInt]}>{DAYS_OF_WEEK[dayInt]}</Label>
              </React.Fragment>
            ))}
          </Fieldset>*/}

        

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


         {/* <Label>Key Findings: </Label> {/* This used to be content 
        <InputText type="textarea" value={content} onChange={this.handleChangeInputKeyFindings} />*/}

        <Button onClick={this.handleInsertItem}>Add Patient</Button>
        <CancelButton href={'/patients'}>Cancel</CancelButton>
        </Wrapper>
      );
  }
}

export default PatientInsert;

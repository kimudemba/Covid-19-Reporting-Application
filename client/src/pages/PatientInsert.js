import React, { Component } from 'react';
import { shared } from '../constants';
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

const Fieldset = styled.fieldset.attrs({
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
})`
  margin: 5px 5px 5px auto;
  text-align: center;
`;

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
      name: '',
      daysOfWeek: {},
      timeframeNote: '',
      priority: 0,
      age: 0,
      zipCode: 0,
      content: '',
    };
  }

  handleChangeInputName = async event => {
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

  handleChangeInputTimeframe = async event => {
    const timeframeNote = event.target.value;
    this.setState({ timeframeNote });
  };

  handleChangeInputPriority = async event => {
    const priority = event.target.validity.valid ? event.target.value : this.state.priority;

    this.setState({ priority });
  };

  handleChangeInputAge = async event => {
    const age = event.target.validity.valid ? event.target.value : this.state.age;

    this.setState({ age });
  };

  handleChangeInputZipCode = async event => {
    const zipcode = event.target.validity.valid ? event.target.value : this.state.zipCode;

    this.setState({ zipcode });
  };

  handleChangeInputContent = async event => {
    const content = event.target.value;
    this.setState({ content });
  };

  handleChangeInputKeyFindings = async event => {
    const keyFindings = event.target.value;
    this.setState({ keyFindings });
  };

  insertSingleItem = item => {
    return api
      .insertItem(item)
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

    /*const { name, daysOfWeek, timeframeNote, priority, age, height, weight, zip, bmi, sex, content, patientID, race, sex } = this.state;
    const item = { name, daysOfWeek, timeframeNote, priority, age, height, weight, zip, bmi, sex, content, patientID, race, sex };

     this.insertSingleItem(item)
      .then(resp => {
        console.log('handleInsertItem: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Item inserted successfully');
          this.setState({
            name: '',
            daysOfWeek: {},
            timeframeNote: '',
            priority: 0,
            age: 0,
            height: 0,
            weight: 0,
            zip: 0,
            bmi: 0,
            sex: "",
            race: "";
            patientID: "";
            content: '',
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
      }); */
  };

  render() {
    const { patientId, daysOfWeek, timeframeNote, priority, age, zipcode, content /* height, weight, zip, bmi, sex, content, patientID, race, sex*/ } = this.state;

    //const { DAYS_OF_WEEK } = shared;

    return (
      <Wrapper>
        <Title>Create Patient</Title>

        <Label>Patient ID: </Label>
          <InputText type="text" value={patientId} onChange={this.handleChangeInputPatientID} />

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

          <Label>Exam ID: </Label>
          <InputText type="text" value={timeframeNote} onChange={this.handleChangeInputTimeframe} />

          {/*<Label>Age: </Label>
          <InputText
            type="number"
            step="0.1"
            lang="en-US"
            min="0"
            max="1000"
            pattern="[0-9]+([,\.][0-9]+)?"
            value={priority}
            onChange={this.handleChangeInputPriority}
          />*/}

        <Label>Zip code: </Label>  {/* This used to be Priority */} 
        <InputText
          type="number"
          step="0.1"
          lang="en-US"
          min="0"
          max="1000"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={zipcode}
          onChange={this.handleChangeInputZipCode}
        />
        <Label>Age: </Label> {/* This used to be priority */} 
        <InputText
          type="number"
          step="0.1"
          lang="en-US"
          min="0"
          max="1000"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={age}
          onChange={this.handleChangeInputAge}
        />
          {/*<Label>Content: </Label>
          <InputText type="textarea" value={content} onChange={this.handleChangeInputContent} />*/}

         {/* <Label>Key Findings: </Label> {/* This used to be content 
        <InputText type="textarea" value={content} onChange={this.handleChangeInputKeyFindings} />*/}

          <Button onClick={this.confirmUpdatePatient}>Update Patient</Button>
          <CancelButton href={'/patients'}>Cancel</CancelButton>
        </Wrapper>
      );
  }
}

export default PatientInsert;

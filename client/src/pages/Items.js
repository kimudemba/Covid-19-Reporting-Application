import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../constants';

import { Button } from '@material-ui/core';
import styled from 'styled-components';

import { PatientList, ItemsPlain, PatientTable, ExamTable} from '../pages';
import ExamList from './ExamTable'; //for some reason this has to be imported seperately
//import PatientInsert from './PatientInsert';
//import {ExamList} from './pages/ExamList';
const LinksGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr [col-start]);
  margin-bottom: 1em;
  min-height: 30px;
  padding: 1em;
  width: 100%;
`;

const LinkGridWrapper = styled.div``;

const isCurrentPage = linkPathname => {
  return window.location.pathname === linkPathname;
};

const linkTextColor = linkPathname => {
  return isCurrentPage(linkPathname) ? '#FFFFFF' : 'rgba(255,255,255,.75)';
};

const itemsPageVariants = [
  {

    name: 'Patients',
    toPathname: routes.PATIENTS,
    pageComponent: PatientList,
  },
  {
    name: 'Exams',
    toPathname: routes.EXAMS,//`${routes.EXAMS}/react-table-v6`,//i removed react table
    pageComponent: ExamList,
  },
  /*{
    name: 'Items (with only styled-components)',
    toPathname: `${routes.ITEMS}/items-plain`,
    pageComponent: ItemsPlain,
  },*/
  {
    name: 'Create Patient',
    toPathname: routes.PATIENT_INSERT, 
  },
  { 
  name: 'Create Exam',
  toPathname:routes.EXAM_INSERT,

    //pageComponent: PatientInsert,

  }
];

class Patients extends Component {
  render() {
    // TODO: would be better to dynamically create the routes based on page variations. I had to add extra exam routes
    const patientsPages = (
      <Switch>
        <Route exact path={routes.PATIENTS} component={PatientList} />
        <Route exact path={`${routes.PATIENTS}/react-table-v6`} component={PatientTable} />
        <Route exact path={`${routes.PATIENTS}/items-plain`} component={ItemsPlain} />
        <Route exact path={routes.EXAMS} component={ExamList} />
        <Route exact path={`${routes.EXAMS}/react-table-v6`} component={ExamTable} />
       {/* <Route exact path={`${routes.EXAMS}/items-plain`} component={ItemsPlain} />*/}
      </Switch>
    );

    return (
      <>
        <LinksGridContainer>
          {itemsPageVariants.map((itemsPageVariant, i) => (
            <LinkGridWrapper
              key={itemsPageVariant.name}
              style={{ gridColumn: `${(i + 2) * 2 - 1} / span 2` }}>
              <Button className="bg-dark" variant="contained">
                <Link
                  style={{ color: linkTextColor(itemsPageVariant.toPathname) }}
                  to={itemsPageVariant.toPathname}>
                  {itemsPageVariant.name}
                </Link>
              </Button>
            </LinkGridWrapper>
          ))}
        </LinksGridContainer>
        {patientsPages}
      </>
    );
  }
}

export default Patients;

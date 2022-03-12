import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Constants
import { routes } from './constants';

// Styles
import { CssBaseline } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Static/Stateless
import { NavBar } from './components';

// Pages
import { PatientInsert, Items, PatientUpdate, PatientList, Patient, ExamInsert, ExamUpdate} from './pages';
import ExamList from './pages/ExamList';
//import { ExamBasicTable } from './components/ExamSpecificComp/ExamBasictable';

//import PatientTable from './pages/PatientList';

class App extends Component {
  render() {
    // TODO: maybe only need one route for Items?
    const publicViews = (
      <Switch>
        {/* <Route exact path={routes.HOME}>
          <Redirect to={routes.PATIENTS} />
        </Route> */}
        <Route exact path={routes.PATIENT_UPDATE} component={PatientUpdate} />
        {/* <Route exact path={routes.HOME} component={Welcome} /> */}
        {/*<Route exact path={routes.Exams} component={ExamBasicTable} /> */}
        <Route exact path={routes.EXAMS} component={ExamList} /> 
        <Route exact path={routes.PATIENTS} component={PatientList} />
        <Route exact path={`${routes.PATIENTS}/items-plain`} component={Items} />
        <Route exact path={`${routes.PATIENTS}/react-table-v6`} component={Items} />
        <Route exact path={routes.PATIENT_INSERT} component={PatientInsert} />
        <Route exact path={routes.EXAM_INSERT} component={ExamInsert} />
        <Route exact path={routes.EXAM_UPDATE} component={ExamUpdate}/>
        <Route exact path={routes.PATIENT} component={Patient} />

      </Switch>
    );

    return (
      <BrowserRouter>
        <CssBaseline />
        <NavBar />
        <div className="app--main">
          <div className="view-container">{publicViews}</div>
          {/* uncomment to see Exam table component*/}
         {/*<ExamBasicTable></ExamBasicTable> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

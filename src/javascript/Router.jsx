import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './containers/Main';

import LoadData from './pages/LoadData';
import SignIn from './pages/SignIn';
import DashboardHoC from './pages/Dashboard';
import AddOffenderHoc from './pages/AddOffender';
import ConfirmOffender from './pages/ConfirmOffender';
import OffenderProfile from './pages/OffenderProfile';
import Question from './pages/Question';
import SummaryHoc from './pages/Summary';
import AssessmentComplete from './pages/AssessmentComplete';
import Error404 from './pages/Error404';

export default (store) => {
  const history = syncHistoryWithStore(hashHistory, store);

  return (
    <Provider store={store}>
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <Route component={Layout}>
          <Route path="/" name="home" component={SignIn} />
          <Route path="/dashboard" name="dashboard" component={DashboardHoC} />
          <Route path="/add-offender" name="add-offender" component={AddOffenderHoc} />
          <Route path="/confirm-offender" name="confirm-offender" component={ConfirmOffender} />
          <Route path="/offender-profile" name="offender-profile" component={OffenderProfile} />
          <Route path="/load-data" name="load-data" component={LoadData} />
          <Route path="/sign-in" name="sign-in" component={SignIn} />
          <Route path="/assessment/:section" component={Question} />
          <Route path="/summary" component={SummaryHoc} />
          <Route path="/assessment-complete" component={AssessmentComplete} />
          <Route path="*" name="404" component={Error404} />
        </Route>
      </Router>
    </Provider>
  );
};

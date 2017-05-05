import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './containers/Main';

import Admin from './pages/Admin';
import SignInHoc from './pages/SignIn';
import DashboardHoC from './pages/Dashboard';
import AddOffenderHoc from './pages/AddOffender';
import ConfirmOffenderHoc from './pages/ConfirmOffender';
import OffenderProfileHoc from './pages/OffenderProfile';
import HealthcareAssessment from './pages/HealthcareAssessment';
import RiskAssessment from './pages/RiskAssessment';
import AssessmentCompleteHoc from './pages/AssessmentComplete';
import AssessmentConfirmationHoc from './pages/AssessmentConfirmation';
import BeforeYouStart from './pages/BeforeYouStart';
import Feedback from './pages/Feedback';
import FeedbackConfirmation from './pages/FeedbackThankyou';
import HealthcareComplete from './pages/HealthcareComplete';
import Error404 from './pages/Error404';

export default (store) => {
  const history = syncHistoryWithStore(hashHistory, store);

  return (
    <Provider store={store}>
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <Route component={Layout}>
          <Route path="/" name="home" component={SignInHoc} />
          <Route path="/before-you-start" component={BeforeYouStart} />
          <Route path="/dashboard" name="dashboard" component={DashboardHoC} />
          <Route path="/add-offender" name="add-offender" component={AddOffenderHoc} />
          <Route path="/confirm-offender" name="confirm-offender" component={ConfirmOffenderHoc} />
          <Route path="/offender-profile" name="offender-profile" component={OffenderProfileHoc} />
          <Route path="/admin" name="admin" component={Admin} />
          <Route path="/sign-in" name="sign-in" component={SignInHoc} />
          <Route path="/healthcare-assessment/:section" component={HealthcareAssessment} />
          <Route path="/healthcare-complete" component={HealthcareComplete} />

          <Route path="/assessment/:section" component={RiskAssessment} />
          <Route path="/assessment-complete" component={AssessmentCompleteHoc} />
          <Route path="/assessment-confirmation" component={AssessmentConfirmationHoc} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/feedback-confirmation" component={FeedbackConfirmation} />
          <Route path="*" name="404" component={Error404} />
        </Route>
      </Router>
    </Provider>
  );
};

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { completeAssessmentFor } from '../actions';
import routes from '../constants/routes';

import SelectableInput from '../components/SelectableInput';

const extractDecision = (questions, exitPoint) => {
  if (exitPoint) {
    const question = questions.find(item => item.riskIndicator === exitPoint);
    return {
      recommendation: 'Single Cell',
      rating: 'High',
      reasons: question.sharedCellPredicate.reasons,
    };
  }

  return {
    recommendation: 'Shared Cell',
    rating: 'Low',
    reasons: [
      'Based on the assessment the prisoner presents a low risk of violence and is unlikely to pose a risk against a cell mate',
    ],
  };
};

const AssessmentComplete = (
  { prisoner: { First_Name, Date_of_Birth, NOMS_Number, Surname }, onSubmit, outcome },
) => (
  <div>
    <h1 className="heading-xlarge">
      Assessment Complete
    </h1>

    <h2 className="heading-large">Prisoner details</h2>

    <div className="c-offender-details-container u-clear-fix u-no-margin-bottom">
      <div className="grid-row">
        <div className="column-one-half">
          <div className="c-offender-profile-image">
            <img src={require('../../images/profile-placeholder.gif')} />
          </div>
          <div data-offender-profile-details className="c-offender-profile-details">
            <div>
              <p className="c-offender-profile-item">
                <span className="heading-small">Name:&nbsp;</span>
                {First_Name} {Surname}
              </p>
            </div>
            <div>
              <p className="c-offender-profile-item">
                <span className="heading-small">DOB:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {Date_of_Birth}
              </p>
            </div>
            <div>
              <p className="c-offender-profile-item">
                <span className="heading-small">NOMIS ID:&nbsp;</span>
                {NOMS_Number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2 className="heading-large">Assessment rating</h2>
    <h3 className="heading-medium">
      Suggested rating: {outcome.rating} - {outcome.recommendation}
    </h3>

    <div className="panel panel-border-wide u-margin-bottom-large">
      <p className="heading-small">Based on the indicator of violence predictor:</p>
      <ul className="list list-bullet">
        {outcome.reasons.map((reason, key) => <li key={key}>{reason}</li>)}
      </ul>
    </div>

    <p>
      <button
        className="button button-start u-margin-bottom-default"
        onClick={() => onSubmit({ ...outcome, nomisId: NOMS_Number })}
      >
        Submit Decision
      </button>
    </p>

  </div>
);

AssessmentComplete.propTypes = {
  outcome: PropTypes.shape({
    recommendation: PropTypes.string,
    rating: PropTypes.string,
    reasons: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func,
  prisoner: PropTypes.shape({
    First_Name: PropTypes.string,
    Date_of_Birth: PropTypes.string,
    NOMS_Number: PropTypes.string,
    Surname: PropTypes.string,
  }),
};

AssessmentComplete.defaultProps = {
  outcome: {
    reasons: [],
  },
  prisoner: {},
  onSubmit: () => {},
};

const mapStateToProps = state => ({
  prisoner: state.offender.selected,
  outcome: extractDecision(state.questions.questions, state.assessmentStatus.exitPoint),
});

const mapActionsToProps = dispatch => ({
  onSubmit: (outcome) => {
    dispatch(completeAssessmentFor(outcome));
    dispatch(push(routes.ASSESSMENT_CONFIRMATION));
  },
});

export { AssessmentComplete };

export default connect(mapStateToProps, mapActionsToProps)(AssessmentComplete);

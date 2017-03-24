import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getQuestions } from '../actions';

import routes from '../constants/routes';

class Summary extends Component {
  componentDidMount() {
    if (!this.props.questions.length) {
      this.props.getQuestions();
    }
  }

  render() {
    const { offender, questions } = this.props;
    const assessmentCompleted = questions.every(question => !!question.completed);
    const completedAssessments = questions.filter(question => !!question.completed).length;

    const questionsRows = questions.map(({
      title,
      riskIndicator,
      completed: questionComplete,
    }, index) => (
      <tr key={riskIndicator}>
        <th><span className="heading-medium u-no-link">{index + 1}. {title}</span></th>
        <td className="numeric">
          {questionComplete
            ? <span className="c-status-indicator">Completed</span>
            : <span className="c-status-indicator">Not started</span>}
        </td>
      </tr>
    ));

    return (
      <div>
        <p>
          <Link to={{ pathname: routes.DASHBOARD }} className="link-back">Back to dashboard</Link>
        </p>
        <h1 className="heading-xlarge">
          <span className="heading-secondary">CSRA Officer Assessment</span>
          Complete sections below
        </h1>

        <div className="grid-row">
          <section className="column-two-thirds">
            <table>
              <tbody>
                {questionsRows}
              </tbody>
            </table>
          </section>
          <div className="column-one-third">
            <aside className="govuk-related-items u-no-margin-top">
              <div className="c-section">
                <h3 className="heading-medium">Prisoner details</h3>
                <p className="u-no-margin">{offender.First_Name} {offender.Surname}</p>
                <p>Nomis ID: {offender.NOMS_Number}</p>
              </div>
              <div className="c-section">
                <h3 className="heading-medium">Assessment status</h3>
                {completedAssessments > 0
                  ? <p>{completedAssessments} of {questions.length} sections complete</p>
                  : <p>Not Started</p>}

              </div>

              {assessmentCompleted &&
                <div className="c-section">
                  <h3 className="heading-medium">Submit Assessment</h3>
                  <p>You can now submit the assessment</p>
                  <Link
                    to={routes.ASSESSMENT_COMPLETE}
                    className="button button-start u-margin-top-default"
                  >
                    Submit
                  </Link>
                </div>}

              {!assessmentCompleted &&
                <Link to={`${routes.ASSESSMENT}/introduction`} className="button button-start u-margin-top-default">
                  Start
                </Link>
              }

            </aside>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = state => ({
  questions: state.questions.questions,
  offender: state.offender.selected,
});

/* eslint-disable react/forbid-prop-types */
Summary.propTypes = {
  offender: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export { Summary };

export default connect(mapPropsToState, { getQuestions })(Summary);

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import routes from '../constants/routes';

import SelectableInput from '../components/SelectableInput';

class AssessmentComplete extends Component {
  render() {
    const { details: { First_Name, Date_of_Birth, NOMS_Number, Surname } } = this.props;
    return (
      <div>
        <h1 className="heading-xlarge">
          <span className="heading-secondary">Assessment Complete</span>
          Prisoner details
        </h1>

        <div className="c-offender-details-container u-clear-fix">
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
        <h3 className="heading-medium">Suggested rating: [SOME RATING]</h3>

        <div className="panel panel-border-wide u-margin-bottom-large">
          <p className="heading-small">Based on the indicator of violence predictor:</p>
          <ul className="list list-bullet">
            <li>[Some reason given here]</li>
          </ul>
        </div>

        <p>
          <Link to={routes.ASSESSMENT_CONFIRMATION} className="button button-start u-margin-bottom-default">
            Submit Decision
          </Link>
        </p>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  details: state.offender.selected,
});

AssessmentComplete.propTypes = {
  details: PropTypes.shape({
    First_Name: PropTypes.string,
    Date_of_Birth: PropTypes.string,
    NOMS_Number: PropTypes.string,
    Surname: PropTypes.string,
  }),
};

export { AssessmentComplete };

export default connect(mapStateToProps)(AssessmentComplete);

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import routes from '../constants/routes';

import SelectableInput from '../components/SelectableInput';

class AssessmentComplete extends Component {
  handleSubmit() {}

  render() {
    const { details: { First_Name, Date_of_Birth, NOMS_Number, Surname } } = this.props;
    return (
      <div>
        <div className="grid-row">
          <div className="column-two-thirds">
            <div className="govuk-box-highlight">
              <h1 className="bold-large">Assessment confirmation</h1>
              <p>
                Prisoner risk assessment has been completed and <br />
                the outcome has been successfully submitted.
              </p>
            </div>

            <p className="u-margin-bottom-default">
              The Governor will receive a copy of the assessment.
            </p>
          </div>
        </div>
        <h2 className="heading-medium">Summary</h2>

        <div className="grid-row">
          <div className="column-two-thirds">
            <div className="c-offender-details-container u-clear-fix u-no-margin-top">
              <div className="grid-row">
                <div className="column-one-half">
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
                <div className="column-one-half">
                  <div className="c-offender-profile-details">
                    <p>
                      <span className="heading-small">Rating: [DYNAMIC]</span>
                    </p>
                    <p><span className="heading-small">Outcome: [DYNAMIC]</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <Link to={routes.DASHBOARD} className="link">Return to dashboard</Link>

        {/*<div className="grid-row">
          <div className="column-two-thirds">
            <form className="c-confirmation-form" onSubmit={this.handleSubmit}>
              <p className="c-form-label-container u-clear-fix bold">
                <SelectableInput
                  required
                  type="checkbox"
                  id="confirmation"
                  value="accepted"
                  text="I have explained this rating outcome to the prisoner"
                  name="confirmation"
                />
              </p>

              <p>
                <input className="button button-start" type="submit" value="Continue" />
              </p>
            </form>
          </div>
        </div>*/}

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

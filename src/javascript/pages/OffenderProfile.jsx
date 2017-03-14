import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import routes from '../constants/routes';

const OffenderProfile = ({ details: { First_Name, Date_of_Birth, NOMS_Number, Surname } }) => (
  <div>
    <p>
      <Link to={{ pathname: routes.DASHBOARD }} className="link-back">Back to dashboard</Link>
    </p>
    <h1 className="heading-xlarge">Confirm offender identity and begin assessment</h1>
    <h2 className="heading-large">Offender details</h2>

    <div className="c-offender-details-container u-clear-fix">
      <div className="grid-row">
        <div className="column-one-half">
          <div className="c-offender-profile-image">
            <img src={require('../../images/profile-placeholder.gif')} />
          </div>
          <div className="c-offender-profile-details">
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
          </div>
        </div>
        <div className="column-one-third">
          <div className="c-offender-profile-details">
            <p>
              <span className="heading-small">Offence:&nbsp;&nbsp;&nbsp;</span> Unavailable
            </p>
            <p><span className="heading-small">Sentence:</span> Unavailable</p>
          </div>
        </div>
      </div>
    </div>

    <p>
      <Link
        to={routes.SUMMARY}
        className="button button-start u-margin-bottom-default"
      >
          Continue to assessment
        </Link>
    </p>

    <h3 className="heading-medium">Before you start</h3>
    <p>Confirm identity of prisoner</p>
    <p>The prisoner is able to answer questions</p>
  </div>
  );

const mapStateToProps = state => ({
  details: state.offender.selected,
});

OffenderProfile.propTypes = {
  details: PropTypes.shape({
    First_Name: PropTypes.string,
    Date_of_Birth: PropTypes.string,
    NOMS_Number: PropTypes.string,
    Surname: PropTypes.string,
  }),
};

export default connect(mapStateToProps)(OffenderProfile);

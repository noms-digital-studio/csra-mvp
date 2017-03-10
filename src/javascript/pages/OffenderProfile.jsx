import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import routes from '../constants/routes'; 

const OffenderProfile = ({ details: { First_Name, Date_of_Birth, NOMS_Number, Surname } }) => {
    return (
        <div>
            <p>
                <Link to={{pathname: routes.DASHBOARD}} className="link-back">Back to dashboard</Link>
            </p>
            <h1 className="heading-xlarge">Confirm offender identity and begin assessment</h1>
            <h2 className="heading-large">Offender details</h2>

            <div className="c-offender-details-container u-clear-fix">
                <div className="grid-row">
                    <div className="column-one-half">
                        <div className="c-offender-profile-image">
                            <img src={require('../../images/profile-placeholder.png')} />
                        </div>
                        <div className="c-offender-profile-details u-pt-20">
                            <div>
                                <span className="c-offender-profile-item">
                                    <span className="heading-small">Name:&nbsp;</span>
                                    {First_Name} {Surname}
                                </span>
                                </div>
                            <div>
                                <span className="c-offender-profile-item">
                                     <span className="heading-small">DOB:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    {Date_of_Birth}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="column-one-third">
                        <div className="c-offender-profile-details u-pt-20">
                            <div><span className="heading-small">Offence:&nbsp;&nbsp;&nbsp;</span> Unavailable</div>
                            <div><span className="heading-small">Sentence:</span> Unavailable</div>
                        </div>
                    </div>
                </div>
            </div>

            <p>
                <Link to={`${routes.ASSESSMENT}/introduction`} className="button button-start u-margin-bottom-default">Start Assessment</Link>
            </p>

            <h3 className="heading-medium">Before you start</h3>
            <p>Confirm identity of prisoner</p>
            <p>The prisoner is able to answer questions</p>
        </div>
    );
};



const mapStateToProps = (state) => ({
    details: state.offender.selected
});


OffenderProfile.propTypes = {
    details: PropTypes.shape({
        First_Name: PropTypes.string, 
        Date_of_Birth: PropTypes.string, 
        NOMS_Number: PropTypes.string, 
        Surname: PropTypes.string
    })
}

export default connect(mapStateToProps)(OffenderProfile);
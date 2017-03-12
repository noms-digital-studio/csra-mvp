import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import { Link } from 'react-router';

import {
    getOffenderNomisProfiles,
    getViperScores,
    selectOffender
} from '../actions';

import routes from '../constants/routes';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getViperScores();
        this.props.getOffenderNomisProfiles();
    }

    renderProfiles() {
        return this.props.profiles.map((profile) => (
            <tr data-profile-row key={profile.NOMS_Number}>
                <td>
                    <span className="c-profile-holder"></span>
                </td>
                <td>{profile.First_Name} {profile.Surname}</td>
                <td>{profile.Date_of_Birth}</td>
                <td>{profile.NOMS_Number}</td>
                <td className="u-text-align-center"><span className="c-status-indicator" /></td>
                <td className="numeric">
                    <button
                        onClick={() => this.props.onOffenderSelect(profile)}
                        className="button"
                    >Start</button>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <header>
                    <div className="grid-row">
                        <div className="column-one-half">
                            <span className="heading-large u-d-block">Prisoners arriving on</span>
                        </div>
                        <div className="column-one-half u-text-align-right">
                            <span className="heading-large u-d-block">{this.props.date}</span>
                        </div>
                    </div>
                </header>
                <div className="c-dashboard-header">
                    <div className="grid-row">
                        <div className="column-one-half">
                            <Link to={routes.ADD_OFFENDER} className="button">Add an offender</Link>
                        </div>
                        <div className="column-one-half u-text-align-right">
                            <span className="heading-medium">Total offenders: {this.props.profiles.length}</span>
                        </div>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th scope="col">Photo</th>
                            <th scope="col">Name</th>
                            <th scope="col">DOB</th>
                            <th scope="col">NOMIS ID</th>
                            <th className="u-text-align-center" scope="col">Assessment</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProfiles()}
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    profiles: state.offender.profiles
});

const mapActionsToProps = (dispatch, ownProps) => {
    return {
        getViperScores: () => dispatch(getViperScores()),
        getOffenderNomisProfiles: () => dispatch(getOffenderNomisProfiles()),
        onOffenderSelect: (offender) => {
            dispatch(selectOffender(offender));
            dispatch(push(`${routes.PRISONER_PROFILE}`));
        }
    };
}


Dashboard.propTypes = {
    profiles: PropTypes.array,
    getViperScores: PropTypes.func,
    getOffenderNomisProfiles: PropTypes.func,
    onOffenderSelect: PropTypes.func,
    date: PropTypes.string
};

Dashboard.defaultProps = {
    profiles: [],
    date: moment().format('dddd MMMM DD YYYY')
};

export { Dashboard };

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
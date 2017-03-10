import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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
            <tr key={profile.NOMS_Number}>
                <td>
                    <span className="c-profile-holder"></span>
                </td>
                <td>{profile.First_Name} {profile.Surname}</td>
                <td>{profile.Date_of_Birth}</td>
                <td>{profile.NOMS_Number}</td>
                <td className="numeric">
                    <button 
                        onClick={() => this.props.onOffenderSelect(profile)} 
                        className="button button-start c-table-start-btn"
                    >Start</button>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <h1 className="heading-xlarge">Dashboard</h1>

                <table>
                    <thead>
                    <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Name</th>
                        <th scope="col">DoB</th>
                        <th scope="col">NOMIS ID</th>
                        <th className="numeric" scope="col">Assessment</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.renderProfiles() }
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
      onOffenderSelect: (offender, nextPath) => {
          dispatch(selectOffender(offender));
          dispatch(push(`${routes.PRISONER_PROFILE}`));
      } 
    };
}


Dashboard.propTypes = {
    profiles: PropTypes.array,
    getViperScores: PropTypes.func,
    getOffenderNomisProfiles: PropTypes.func,
    onOffenderSelect: PropTypes.func
};


export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
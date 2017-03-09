import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getOffenderNomisProfiles, getViperScores } from '../actions'

class Dashboard extends Component {

    componentDidMount() {
        this.props.getViperScores();
        this.props.getOffenderNomisProfiles();
    }

    renderProfiles() {
        return this.props.profiles.map(({First_Name, Surname, NOMS_Number, Date_of_Birth}) => (
            <tr key={NOMS_Number}>
                <td>[Photo]</td>
                <td>{First_Name} {Surname}</td>
                <td>{Date_of_Birth}</td>
                <td>{NOMS_Number}</td>
                <td>[]</td>
                <td>Start</td>
            </tr>
        ));
    }

    render() {
        console.log(this.props.profiles)
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
                        <th scope="col">Assessment</th>
                        <th scope="col"></th>
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

export default connect(mapStateToProps, { getOffenderNomisProfiles, getViperScores }) (Dashboard);
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ViolenceRisk extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <aside className="govuk-related-items" role="complementary">
                <h3 className="heading-medium u-margin-top-default" id="subsection-title">Risk of Violence</h3>
                <p><strong>LOW</strong></p>
            </aside>
        )
    }
}


ViolenceRisk.propTypes = {
    prisonerId: PropTypes.string,

}

const mapStateToProps = (state, ownProps) => ({ 
    prisonerId: state.prisoner.current.nomsID 
});

export default connect(mapStateToProps, null)(ViolenceRisk);


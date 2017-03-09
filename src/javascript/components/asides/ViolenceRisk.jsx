import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { calculateRiskFor, viperScores } from '../../services';

const ViolenceRisk = ({ rating }) => {
    const riskScoreClasses = classnames({
        'c-risk-threat': true,
        'heading-large': true,
        [`c-risk-threat--${rating}`]: true
    });

    return (
        <aside className="govuk-related-items" role="complementary">
            <h3 className="heading-medium u-margin-top-default" id="subsection-title">Risk of Violence</h3>
            <p><span data-viper-rating={rating} className={riskScoreClasses}>{rating}</span></p>
        </aside>
    );
}


ViolenceRisk.propTypes = {
    rating: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({ 
    rating: calculateRiskFor(state.prisoner.current.nomsID, viperScores())
});


export { ViolenceRisk };

//Connect HOC
export default connect(mapStateToProps, null)(ViolenceRisk);

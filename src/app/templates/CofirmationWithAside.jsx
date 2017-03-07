import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Aside from '../components/asides/Index'; 

const ConfirmationWithAside = ({ title, description, aside, onSubmit }) => {
    return (
        <div>
            <div className="grid-row">
                <div className="column-two-thirds">
                    <h3 className="heading-medium">{title}</h3>
                    <div className="govuk-box-highlight c-govuk-box-highlight">
                       <blockquote className="c-box-blockquote">{description}</blockquote>
                    </div>

                    <form className="c-confirmation-form" onSubmit={onSubmit}>
                        <label htmlFor="confirm" className="block-label c-form-label selection-button-checkbox">
                            <input type="checkbox" name="confirm" value="accept" id="confirm" />
                            <span className="heading-small">I confirm that this has been explained to the prisoner</span>
                        </label>

                        <p>
                            <input type="submit" className="button button-start" value="Save &amp; Continue" />
                        </p>
                        <p>
                            <Link to="/">Save and return</Link>
                        </p>
                    </form>
                </div>
                <div className="column-third">
                    <Aside  {...aside} />
                </div>
            </div>
        </div>
    );
}

ConfirmationWithAside.propTypes = {
    title: PropTypes.string,
    details: PropTypes.string
};

ConfirmationWithAside.defaultProps = {
    aside: {}
};

export default ConfirmationWithAside;
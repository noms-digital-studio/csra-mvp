import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import SelecteableInput from '../components/SelecteableInput';
import Aside from '../components/asides/Index'; 

const ConfirmationWithAside = ({ title, description, aside, onSubmit }) => {
    return (
        <div>
            <div className="grid-row">
                <div className="column-two-thirds">
                    <h3 className="heading-medium">{title}</h3>
                    <div role="note" aria-label="Information" className="panel panel-border-wide">
                       <p>{description}</p>
                    </div>

                    <form className="c-confirmation-form" onSubmit={onSubmit}>
                        <p className="c-form-label-container u-clear-fix bold">
                            <SelecteableInput
                                type="checkbox"
                                id="confirmation"
                                value="accept"
                                text="I confirm that this has been explained to the prisoner"
                                name="confirmation"
                            />
                        </p>
                        <p>
                            <input type="submit" className="button" value="Save and continue" />
                        </p>
                        <p>
                            <Link to="/">Save and return</Link>
                        </p>
                    </form>
                </div>
                <div className="column-third">
                    <Aside {...aside} />
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
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import SelecteableInput from '../components/SelecteableInput';

const Confirmation = ({ title, description, onSubmit }) => {
    return (
        <div>
            <div className="grid-row">
                <div className="column-full">
                    <h3 className="heading-medium">{title}</h3>
                    <div role="note" aria-label="Information" className="panel panel-border-wide">
                        <p>{description}</p>                       
                    </div>
                </div>
            </div>
            <div className="grid-row">
                <div className="column-two-thirds">
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
                            <input className="button" type="submit" value="Save and continue" />
                        </p>
                        <p>
                            <Link to="/">Save and return</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

Confirmation.propTypes = {
    title: PropTypes.string,
    details: PropTypes.string
};

export default Confirmation;
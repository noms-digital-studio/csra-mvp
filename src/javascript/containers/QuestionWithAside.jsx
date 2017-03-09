import React, { PropTypes, Component } from 'react';
import { hashHistory, Link } from 'react-router';
import uuid from 'uuid/v4';

import Aside from '../components/asides/Index';
import SelecteableInputGroup from '../components/SelecteableInputGroup';


const QuestionWithAside = ({ title, description, aside, onSubmit }) => {
    return (
        <div className="grid-row">
            <div className="column-two-thirds">
                <form key={uuid()} action="/" method="post" className="form" onSubmit={onSubmit}>
                    <h3 className="heading-medium">{title}</h3>
                    <p>{description}</p>

                    <div className="form-group">
                        <fieldset>
                            <SelecteableInputGroup
                                type="radio"
                                fields={[
                                    { value: "yes", text: "Yes", name: "answer" },
                                    { value: "no", text: "No", name: "answer" }, 
                                ]}
                            />
                        </fieldset>
                    </div>

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
    );
};


QuestionWithAside.propTypes = {
    title: PropTypes.string, 
    description: PropTypes.string, 
    aside: PropTypes.object.isRequired, 
    onSubmit: PropTypes.func
};


export default QuestionWithAside;
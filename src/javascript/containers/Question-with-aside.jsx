import React, { PropTypes, Component } from 'react';
import { hashHistory, Link } from 'react-router';
import uuid from 'uuid/v4';

import Aside from '../components/asides/Index';
import RadioButton from '../components/RadioButton';


class QuestionWithAside extends Component {

    render() {
        const {
            title, 
            description, 
            aside,
            onSubmit
        } = this.props;

        return (
            <div className="grid-row">
                <div className="column-two-thirds">
                    <form key={uuid()} action="/" method="post" className="form" onSubmit={onSubmit}>
                        <h3 className="heading-medium">{title}</h3>
                        <p>{description}</p>

                        <div className="form-group">
                            <fieldset>
                                <RadioButton name="answer" id="radio-yes" value="Yes" textValue="Yes" />
                                <RadioButton name="answer" id="radio-no" value="No" textValue="No" />
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
    }
};


QuestionWithAside.propTypes = {
    currentSection: PropTypes.number,
    totalSections: PropTypes.number,
    profileFirstName: PropTypes.string,
    profileLastName: PropTypes.string,
    postActionUrl: PropTypes.string,
    questionTitle: PropTypes.string,
    questionDescription: PropTypes.string,
    subsectionTitle: PropTypes.string
};


export { QuestionWithAside };
export default QuestionWithAside;
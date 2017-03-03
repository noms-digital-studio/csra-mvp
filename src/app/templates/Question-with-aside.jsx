import React, { PropTypes, Component } from 'react';
import { hashHistory, Link } from 'react-router';
import uuid from 'uuid/v4';

import RadioButton from '../components/RadioButton';
import Questions from '../fixtures/questions.json';


class QuestionWithAside extends Component {

    render() {
        const {
            profileFirstName,
            profileLastName,
            data: {  totalSections, questionIndex, question },
            handleFormSubmit
        } = this.props;

        const { 
            title, 
            description, 
            aside: { 
                title: asideTitle, 
                description: asideDescription 
            } 
        } = question;

        return (
            <div className="o-question">
                <div className="grid-row">
                    <div className="column-half">
                        <h2 className="c-section-title">Section {questionIndex + 1} of {totalSections}</h2>
                    </div>
                    <div className="column-half">
                        <h2 className="bold-medium u-text-align-right" id="subsection-title">{profileFirstName} {profileLastName}</h2>
                    </div>
                </div>

                <div className="grid-row">
                    <div className="column-half">
                        <form key={uuid()} action="/" method="post" className="form" onSubmit={handleFormSubmit}>
                            <h3 className="heading-medium">{title}</h3>
                            <p>{description}</p>

                            <div className="form-group">
                                <fieldset>
                                    <RadioButton name="answer" id="radio-yes" value="Yes" textValue="Yes" />
                                    <RadioButton name="answer" id="radio-no" value="No" textValue="No" />
                                </fieldset>
                            </div>

                            <p>
                                <input type="submit" className="button button-start" value="Save &amp; Continue" />
                            </p>
                            <p>
                                <Link to="/">Save and return</Link>
                            </p>
                        </form>
                    </div>
                    <div className="column-half">
                        <aside className="govuk-related-items" role="complementary">
                            <h3 className="heading-medium u-margin-top-default" id="subsection-title">{asideTitle}</h3>
                            <p>{asideDescription}</p>
                        </aside>
                    </div>
                </div>
            </div>
        )
    }
};


QuestionWithAside.defaultProps = {
    profileFirstName: "John",
    profileLastName: "Smith"
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
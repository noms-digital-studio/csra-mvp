import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { isEmpty } from 'ramda';

import Routes from '../constants/routes';
import { getQuestions, storeAnswer } from '../actions';

import QuestionWithAsideTemplate from '../templates/Question-with-aside';


class Question extends Component {
    componentDidMount() {
        //Temporary
        this.props.getQuestions();
    }

    handleFormSubmit(data) {
        const { questionIndex } = this.sectionData(this.props.questions, this.props.params.section);
        const nextQuestionIndex = questionIndex + 1;
        if (this.props.questions[nextQuestionIndex]) {
            const nextQuestion = this.props.questions[nextQuestionIndex];
            return hashHistory.push({pathname: `${Routes.ASSESSMENT}/${nextQuestion.risk_indicator}` })  
        }

        
        
        return hashHistory.push({ pathname: "/" });
        // this.props.storeAnswer({});
    }

    sectionData(questions = [], section = "") {
        if (isEmpty(questions)) {
            return {
                totalSections: 0,
                question: {
                    aside: {}
                },
                questionIndex: 0
            }
        } else {
            const sectionEqls = item => item.risk_indicator === section;        
            const index = questions.findIndex(sectionEqls);    
            const total = questions.length;
            const question = questions.find(sectionEqls);
            const adJustedIndex = (index !== undefined) ? index : 0;

            return {
                totalSections: total,
                question: question,
                questionIndex: adJustedIndex
            };
        }        
    }

    render() {
        const { questions, params: { section } } = this.props;

        return (
            <QuestionWithAsideTemplate
                section={section}
                data={this.sectionData(questions, section)}
                handleFormSubmit={(e) => this.handleFormSubmit(e)}
            />
        )
        
    }
}

/*class Question extends Component {

    render() {
        const { title, description } = this.props;
        return (
            <div className="o-question">
                <div className="grid-row">
                    <div className="column-half">
                        <h2 className="c-section-title">Section 1 of 12</h2>
                    </div>
                    <div className="column-half">
                        <h2 className="bold-medium u-text-align-right" id="subsection-title">Kenedy Brian</h2>                        
                    </div>
                </div>

                <div className="grid-row">
                    <div className="column-half">
                        <form action="/" method="post" className="form">
                            <h3 className="heading-medium">{title}</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum dolorem, 
                                similique consequatur vero quia quisquam laborum dolore excepturi ipsam voluptatibus 
                                rerum at ea reiciendis in laudantium, laboriosam quam soluta. Laborum.
                            </p>

                            <div className="form-group">
                                <fieldset>
                                    <RadioButton name="answer" id="radio-yes" value="Yes" textValue="Yes"/>
                                    <RadioButton name="answer" id="radio-no" value="No" textValue="No" />
                                </fieldset>
                            </div>

                            <p>
                                <input type="submit" className="button button-start" value="Save &amp; Continue" />
                            </p>
                            <p>
                                <a href="#">Save and return</a>  
                            </p>                          
                        </form>
                    </div>
                    <div className="column-half">
                        <aside className="govuk-related-items" role="complementary">
                            <h3 className="heading-medium u-margin-top-default" id="subsection-title">How to ask</h3>
                            
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                Earum aut, incidunt modi quos, rerum cumque velit minima beatae sit 
                                perferendis officia accusamus laudantium libero commodi. 
                                Ad pariatur facilis consequatur optio.
                            </p>

                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                Earum aut, incidunt modi quos, rerum cumque velit minima beatae sit 
                                perferendis officia accusamus laudantium libero commodi. 
                                Ad pariatur facilis consequatur optio.
                            </p>
                        </aside>
                    </div>
                </div>
            </div>
        );
    }
}


Question.defaultProps = {
    title: "Introduction",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum dolorem, similique consequatur vero quia quisquam laborum dolore excepturi ipsam voluptatibus rerum at ea reiciendis in laudantium, laboriosam quam soluta. Laborum.",
};


export default Question;*/

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    questions: state.questions.questions
});


export default connect(mapStateToProps, { getQuestions })(Question);
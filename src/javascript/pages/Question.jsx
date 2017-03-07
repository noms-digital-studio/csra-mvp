import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { isEmpty } from 'ramda';

import Routes from '../constants/routes';
import { getQuestions, storeAnswer } from '../actions';

import QuestionWithAsideTemplate from '../containers/Question-with-aside';
import ConfirmationTemplate from '../containers/Confirmation';
import ConfirmationWithAsideTemplate from '../containers/CofirmationWithAside';


function templateSelector (data) {
    switch(data.template) {
        case 'confirmation':
            return <ConfirmationTemplate {...data} />
        case 'confirmation_with_aside':
            return <ConfirmationWithAsideTemplate {...data} />
        case 'default_with_aside':
            return <QuestionWithAsideTemplate {...data} />
        default:
            return null
    }
}



class Question extends Component {
    componentDidMount() {
        //Temporary
        this.props.getQuestions();
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const { sectionIndex } = this.sectionData(this.props.questions, this.props.params.section);
        const nextsectionIndex = sectionIndex + 1;
        if (this.props.questions[nextsectionIndex]) {
            const nextQuestion = this.props.questions[nextsectionIndex];
            return hashHistory.push({pathname: `${Routes.ASSESSMENT}/${nextQuestion.riskIndicator}` })  
        }
        
        return hashHistory.push({ pathname: "/" });
        // this.props.storeAnswer({});
    }

    sectionData(questions = [], section = "") {
        if (isEmpty(questions)) {
            return {
                totalSections: 0,
                question: {},
                sectionIndex: 0
            }
        } else {
            const sectionEqls = item => item.riskIndicator === section;        
            const index = questions.findIndex(sectionEqls);    
            const total = questions.length;
            const question = questions.find(sectionEqls);
            const adJustedIndex = (index !== undefined) ? index : 0;

            return {
                totalSections: total,
                question: question,
                sectionIndex: adJustedIndex
            };
        }        
    }

    render() {
        const { 
            questions, 
            params: { section },
            profileFirstName,
            profileLastName 
        } = this.props;

        const { totalSections, sectionIndex, question } = this.sectionData(questions, section);
        
        return (
            <div className="o-question">
                <div className="grid-row">
                    <div className="column-half">
                        <h2 className="c-section-title">Section {sectionIndex + 1} of {totalSections}</h2>
                    </div>
                    <div className="column-half">
                        <h2 className="bold-medium u-text-align-right" id="subsection-title">{profileFirstName} {profileLastName}</h2>
                    </div>
                </div>
                { templateSelector({...question, onSubmit: (e) => this.handleFormSubmit(e)}) }
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    questions: state.questions.questions
});


Question.defaultProps = {
    profileFirstName: "John",
    profileLastName: "Smith"
};

export default connect(mapStateToProps, { getQuestions })(Question);
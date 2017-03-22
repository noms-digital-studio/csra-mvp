import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import serialize from 'form-serialize';

import path from 'ramda/src/path';
import isEmpty from 'ramda/src/isEmpty';

import { assessmentCanContinue, calculateRiskFor } from '../services';
import { getQuestions, saveAnswer } from '../actions';
import Routes from '../constants/routes';

import QuestionWithAsideTemplate from '../containers/QuestionWithAside';
import QuestionWithComments from '../containers/QuestionWithComments';
import Comments from '../containers/Comments';
import ConfirmationTemplate from '../containers/Confirmation';
import ConfirmationWithAsideTemplate from '../containers/ConfirmationWithAside';
import HealthcareAssessment from '../containers/HealthAssessment';

function templateSelector(data) {
  switch (data.template) {
    case 'confirmation':
      return <ConfirmationTemplate {...data} />;
    case 'confirmation_with_aside':
      return <ConfirmationWithAsideTemplate {...data} />;
    case 'default_with_aside':
      return <QuestionWithAsideTemplate {...data} />;
    case 'question_with_comments':
      return <QuestionWithComments {...data} />;
    case 'comments':
      return <Comments {...data} />;
    case 'healthcare_assessment':
      return <HealthcareAssessment {...data} />;
    default:
      return null;
  }
}

const reduceYesNoAnswers = answers =>
  Object.keys(answers).reduce((result, key) => ({ ...result, [key]: answers[key].answer }), {});

const sectionData = (questions = [], section = '') => {
  if (isEmpty(questions)) {
    return {
      totalSections: 0,
      question: {},
      sectionIndex: 0,
    };
  }
  const sectionEqls = item => item.riskIndicator === section;
  const index = questions.findIndex(sectionEqls);

  const total = questions.length;
  const question = questions.find(sectionEqls);
  const adJustedIndex = index !== undefined ? index : 0;

  return {
    totalSections: total,
    question,
    sectionIndex: adJustedIndex,
  };
};

class Question extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { params: { section }, questions, answers, prisonerViperScore } = this.props;
    const { sectionIndex, question } = sectionData(questions, section);
    const answer = serialize(event.target, { hash: true });
    const basePath = Routes.ASSESSMENT;
    const nextSectionIndex = sectionIndex + 1;
    const reducedAnswers = reduceYesNoAnswers({ ...answers, [section]: answer });

    let nextPath;

    const canContinue = assessmentCanContinue(question, reducedAnswers, prisonerViperScore);

    if (canContinue && questions[nextSectionIndex]) {
      nextPath = `${basePath}/${questions[nextSectionIndex].riskIndicator}`;
    } else {
      nextPath = Routes.ASSESSMENT_COMPLETE;
    }

    this.props.onSubmit(question.riskIndicator, answer, nextPath);
  }

  render() {
    const {
      answers,
      questions,
      prisonerViperScore,
      params: { section },
      prisoner: { firstName, surname },
    } = this.props;

    const { totalSections, sectionIndex, question } = sectionData(questions, section);

    return (
      <div className="o-question">
        <div className="grid-row">
          <div className="column-half">
            <h2
              data-section-holder={`Section ${sectionIndex + 1} of ${totalSections}`}
              className="c-section-title"
            >
              <span>Section&nbsp;</span>
              <span>{sectionIndex + 1}</span>
              <span>&nbsp;of&nbsp;</span>
              <span>{totalSections}</span>
            </h2>

          </div>
          <div className="column-half">
            <h2 className="bold-medium u-text-align-right" id="subsection-title">
              {firstName} {surname}
            </h2>
          </div>
        </div>
        {templateSelector({
          ...question,
          onSubmit: e => this.handleFormSubmit(e),
          formDefaults: answers[section],
          viperScore: prisonerViperScore,
        })}
      </div>
    );
  }
}

Question.propTypes = {
  prisonerViperScore: PropTypes.string,
  answers: PropTypes.object,
  questions: PropTypes.array,
  params: PropTypes.object,
  prisoner: PropTypes.object,
  getQuestions: PropTypes.func,
  onSubmit: PropTypes.func,
};

Question.defaultProps = {
  answers: {},
  questions: [],
  params: {},
  prisoner: {},
  getQuestions: () => {},
  onSubmit: () => {},
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  questions: state.questions.questions,
  prisoner: {
    firstName: state.offender.selected.First_Name,
    surname: state.offender.selected.Surname,
  },
  prisonerViperScore: calculateRiskFor(
    state.offender.selected.NOMS_Number,
    state.offender.viperScores,
  ),
  answers: path([state.answers.selectedPrisonerId], state.answers.answers),
});

const mapActionsToProps = dispatch => ({
  getQuestions: () => {
    dispatch(getQuestions());
  },
  onSubmit: (riskIndicator, answer, nextPath) => {
    dispatch(saveAnswer(riskIndicator, answer));
    dispatch(push(nextPath));
  },
});

export { Question };
export default connect(mapStateToProps, mapActionsToProps)(Question);

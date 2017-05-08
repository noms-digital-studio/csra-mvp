import React, { Component, PropTypes } from 'react';
import serialize from 'form-serialize';

import isEmpty from 'ramda/src/isEmpty';

import { assessmentCanContinue } from '../services';

import routes from '../constants/routes';

import Comments from '../containers/Comments';
import ConfirmationTemplate from '../containers/Confirmation';
import ConfirmationWithAsideTemplate from '../containers/ConfirmationWithAside';
import HealthcareAssessor from '../containers/HealthcareAssessor';
import QuestionWithAsideTemplate from '../containers/QuestionWithAside';
import QuestionWithCommentAndAsideTemplate from '../containers/QuestionWithCommentAndAside';
import QuestionWithComments from '../containers/QuestionWithTextBox';
import Viper from '../containers/Viper';

function templateSelector(data) {
  switch (data.template) {
    case 'confirmation':
      return <ConfirmationTemplate {...data} />;
    case 'confirmation_with_aside':
      return <ConfirmationWithAsideTemplate {...data} />;
    case 'viper':
      return <Viper {...data} />;
    case 'default_with_aside':
      return <QuestionWithAsideTemplate {...data} />;
    case 'default_with_comment_aside':
      return <QuestionWithCommentAndAsideTemplate {...data} />;
    case 'question_with_comments':
      return <QuestionWithComments {...data} />;
    case 'comments':
      return <Comments {...data} />;
    case 'healthcare_assessment':
      return <HealthcareAssessor {...data} />;
    default:
      return null;
  }
}

const reduceYesNoAnswers = answers =>
  Object.keys(answers).reduce(
    (result, key) => ({ ...result, [key]: answers[key].answer }),
    {},
  );

const sectionData = (questions = [], section = '') => {
  if (isEmpty(questions)) {
    return {
      totalSections: 0,
      question: {},
      sectionIndex: 0,
    };
  }
  const sectionEqls = item => item.section === section;
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

class Questionnaire extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const {
      params: { section },
      questions,
      answers,
      prisonerViperScore,
      basePath,
      completionPath,
    } = this.props;
    const { sectionIndex, question } = sectionData(questions, section);
    const answer = serialize(event.target, { hash: true });
    const nextSectionIndex = sectionIndex + 1;
    const reducedAnswers = reduceYesNoAnswers({
      ...answers,
      [section]: answer,
    });

    let nextPath;

    const canContinue = assessmentCanContinue(
      question,
      reducedAnswers,
      prisonerViperScore,
    );

    if (canContinue && questions[nextSectionIndex]) {
      nextPath = `${basePath}/${questions[nextSectionIndex].section}`;
    } else {
      nextPath = completionPath;
    }

    this.props.onSubmit({
      section: question.section,
      answer,
      nextPath,
      canContinue,
    });
  }

  render() {
    const {
      answers,
      questions,
      prisonerViperScore,
      params: { section },
      prisoner: { firstName, surname },
    } = this.props;

    const { totalSections, sectionIndex, question } = sectionData(
      questions,
      section,
    );

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
            <h2
              className="bold-medium u-text-align-right"
              id="subsection-title"
            >
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

Questionnaire.propTypes = {
  basePath: PropTypes.string,
  completionPath: PropTypes.string,
  prisonerViperScore: PropTypes.string,
  answers: PropTypes.object,
  questions: PropTypes.array,
  params: PropTypes.object,
  prisoner: PropTypes.object,
  getQuestions: PropTypes.func,
  onSubmit: PropTypes.func,
};

Questionnaire.defaultProps = {
  answers: {},
  questions: [],
  params: {},
  prisoner: {},
  prisonerViperScore: '',
  getQuestions: () => {},
  onSubmit: () => {},
};

export default Questionnaire;

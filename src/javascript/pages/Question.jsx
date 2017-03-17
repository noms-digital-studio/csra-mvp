import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import serialize from 'form-serialize';

import { isEmpty } from 'ramda';

import Routes from '../constants/routes';
import { getQuestions, saveAnswer } from '../actions';

import QuestionWithAsideTemplate from '../containers/QuestionWithAside';
import QuestionWithComments from '../containers/QuestionWithComments';
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
    case 'default_with_comments':
      return <QuestionWithComments {...data} />;
    case 'healthcare_assessment':
      return <HealthcareAssessment {...data} />;
    default:
      return null;
  }
}

class Question extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { sectionIndex, question } = this.sectionData(
      this.props.questions,
      this.props.params.section,
    );
    const answer = serialize(event.target, { hash: true });
    const basePath = Routes.ASSESSMENT;
    const nextSectionIndex = sectionIndex + 1;

    let nextPath;

    if (this.props.questions[nextSectionIndex]) {
      nextPath = `${basePath}/${this.props.questions[nextSectionIndex].riskIndicator}`;
    } else {
      nextPath = Routes.SUMMARY;
    }

    this.props.onSubmit(question.riskIndicator, answer, nextPath);
  }

  sectionData(questions = [], section = '') {
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
  }

  render() {
    const {
      questions,
      params: { section },
      prisoner: { firstName, surname },
    } = this.props;

    const { totalSections, sectionIndex, question } = this.sectionData(questions, section);

    return (
      <div className="o-question">
        <div className="grid-row">
          <div className="column-half">
            <h2
              data-section-holder={`Section ${sectionIndex + 1} of ${totalSections}`}
              className="c-section-title"
            >
              <span>Section&nbsp;</span>
              <span className="circle circle-step">{sectionIndex + 1}</span>
              <span>&nbsp;of&nbsp;</span>
              <span className="circle circle-step">{totalSections}</span>
            </h2>

          </div>
          <div className="column-half">
            <h2 className="bold-medium u-text-align-right" id="subsection-title">
              {firstName} {surname}
            </h2>
          </div>
        </div>
        {templateSelector({ ...question, onSubmit: e => this.handleFormSubmit(e) })}
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.array,
  params: PropTypes.object,
  prisoner: PropTypes.object,
  getQuestions: PropTypes.func,
  onSubmit: PropTypes.func,
};

Question.defaultProps = {
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

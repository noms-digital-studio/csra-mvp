import questionnaireReducer from '../../../src/javascript/reducers/questionnaire';

describe('questionnaireReducer', () => {
  const defaultState = {
    questions: [],
  };

  it('returns a default state', () => {
    expect(questionnaireReducer(undefined, 'UNKNOWN_ACTION')).to.eql(defaultState);
  });

  it('returns the state with questions included', () => {
    const questions = [
      {
        riskIndicator: 'foo-risk-indicator',
        title: 'foo-title',
        description: 'foo-description',
        template: 'foo-template',
      },
    ];
    const action = { type: 'GET_QUESTIONS', payload: questions };
    const expectedState = { ...defaultState, questions };

    expect(questionnaireReducer(undefined, action)).to.eql(expectedState);
  });
});

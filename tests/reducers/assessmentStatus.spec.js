import assessmentStatusReducer from '../../src/javascript/reducers/assessmentStatus';

describe('#assessmentStatusReducer', () => {
  const defaultState = {
    completed: [],
  };

  it('returns a default state', () => {
    expect(assessmentStatusReducer(undefined, 'UNKNOWN_ACTION')).to.eql(defaultState);
  });

  it('adds a nomis-id to the completed list', () => {
    const action = {
      type: 'COMPLETE_ASSESSMENT',
      payload: 'foo-id',
    };
    const expectedState = {
      ...defaultState,
      completed: ['foo-id'],
    };

    expect(assessmentStatusReducer(undefined, action)).to.eql(expectedState);
  });
});

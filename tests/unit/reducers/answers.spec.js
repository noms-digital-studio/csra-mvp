import answersReducer from '../../../src/javascript/reducers/answers';

describe('answersReducer', () => {
  const defaultState = {
    selectedPrisonerId: '',
    csra: {},
    healthcare: {},
  };

  it('returns a default state', () => {
    expect(answersReducer(undefined, 'UNKNOWN_ACTION')).to.eql(defaultState);
  });

  it('stores the selected prisoner', () => {
    const profile = {
      NOMS_Number: 'foo',
      Surname: 'foobar',
      First_Name: 'foobaz',
      Date_of_Birth: 'foo-age',
    };
    const action = { type: 'SELECT_OFFENDER', payload: profile };
    const expectedState = { ...defaultState, selectedPrisonerId: profile.NOMS_Number };

    expect(answersReducer(undefined, action)).to.eql(expectedState);
  });

  it('saves an answer for the selectedPrisonerId', () => {
    const selectedPrisonerId = 'foo-id';
    const state = { ...defaultState, selectedPrisonerId };
    const action = { type: 'SAVE_CSRA_ANSWER', payload: { fooRisk: { answer: 'yes' } } };
    const expectedState = {
      ...state,
      csra: {
        [selectedPrisonerId]: {
          fooRisk: { answer: 'yes' },
        },
      },
    };

    expect(answersReducer(state, action)).to.eql(expectedState);
  });

  it('updates an answer for the selectedPrisonerId', () => {
    const selectedPrisonerId = 'foo-id';
    const state = {
      selectedPrisonerId,
      csra: {
        [selectedPrisonerId]: {
          fooRisk: { answer: 'yes' },
        },
      },
    };
    const action = { type: 'SAVE_CSRA_ANSWER', payload: { fooRisk: { answer: 'no' } } };
    const expectedState = {
      ...state,
      csra: {
        [selectedPrisonerId]: {
          fooRisk: { answer: 'no' },
        },
      },
    };

    expect(answersReducer(state, action)).to.eql(expectedState);
  });
});

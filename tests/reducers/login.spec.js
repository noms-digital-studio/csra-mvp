import loginReducer from '../../src/javascript/reducers/login';

describe('#loginReducer', () => {
  const defaultState = {
    loggedIn: false,
    currentUser: {
      name: '',
    },
  };

  it('returns a default state', () => {
    expect(loginReducer(undefined, 'UNKNOWN_ACTION')).to.eql(defaultState);
  });

  it('return the state with a selected user', () => {
    const action = { type: 'SIGN_IN', payload: 'Foo Bar' };
    const expectedState = {
      ...defaultState,
      loggedIn: true,
      currentUser: {
        name: 'Foo Bar',
      },
    };
    expect(loginReducer(undefined, action)).to.eql(expectedState);
  });
});

import userReducer from '../../src/javascript/reducers/users';

describe('#usersReducer', () => {
  const defaultState = {
      name: '',
  };

  it('returns a default state', () => {
    expect(userReducer(undefined, 'UNKNOWN_ACTION')).to.eql(defaultState);
  });

  it('return the state with a selected user', () => {
    const action = { type: 'SIGN_IN', payload: 'Foo Bar' };
    const expectedState = {
      ...defaultState,
      name: 'Foo Bar',
    };
    expect(userReducer(undefined, action)).to.eql(expectedState);
  });
});

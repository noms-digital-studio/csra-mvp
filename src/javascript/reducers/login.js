import { SIGN_IN } from '../constants/actions';

const defaultState = {
  loggedIn: false,
  currentUser: {
    name: '',
  },
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return { ...state, currentUser: { name: payload }, loggedIn: true };
    default:
      return state;
  }
};

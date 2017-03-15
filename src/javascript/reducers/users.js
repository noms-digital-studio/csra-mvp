import { SIGN_IN } from '../constants/actions';

const defaultState = {
  name: '',
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return { ...state, name: payload };
    default:
      return state;
  }
};

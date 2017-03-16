import { GET_QUESTIONS } from '../constants/actions';

const defaultState = {
  questions: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

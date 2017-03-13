import { STORE_ANSWER, GET_QUESTIONS } from '../constants/actions';

const defaultState = {
  questions: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, questions: action.payload };
    case STORE_ANSWER:
      return state;
    default:
      return state;
  }
};

import { COMPLETE_ASSESSMENT, SAVE_EXIT_POINT } from '../constants/actions';

const defaultState = {
  completed: [],
  exitPoint: '',
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case COMPLETE_ASSESSMENT:
      return {
        ...state,
        exitPoint: '',
        completed: [...state.completed, payload],
      };
    case SAVE_EXIT_POINT:
      return {
        ...state,
        exitPoint: payload,
      };
    default:
      return state;
  }
};

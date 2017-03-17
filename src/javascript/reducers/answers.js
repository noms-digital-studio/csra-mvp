import { SELECT_OFFENDER, SAVE_ANSWER } from '../constants/actions';

const defaultState = {
  selectedPrisonerId: '',
  answers: {},
};

const upsertAnswer = (answers, newAnswer) => ({ ...answers, ...newAnswer });

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SELECT_OFFENDER:
      return { ...state, selectedPrisonerId: payload.NOMS_Number };

    case SAVE_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [state.selectedPrisonerId]: upsertAnswer(
            state.answers[state.selectedPrisonerId],
            payload,
          ),
        },
      };
    default:
      return state;
  }
};

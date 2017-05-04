import { SELECT_OFFENDER, SAVE_CSRA_ANSWER } from '../constants/actions';

const defaultState = {
  selectedPrisonerId: '',
  csra: {},
  healthcare: {},
};

const upsertAnswer = (answers, newAnswer) => ({ ...answers, ...newAnswer });

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SELECT_OFFENDER:
      return { ...state, selectedPrisonerId: payload.NOMS_Number };

    case SAVE_CSRA_ANSWER:
      return {
        ...state,
        csra: {
          ...state.csra,
          [state.selectedPrisonerId]: upsertAnswer(
            state.csra[state.selectedPrisonerId],
            payload,
          ),
        },
      };
    default:
      return state;
  }
};

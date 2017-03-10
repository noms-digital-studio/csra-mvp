import { 
    GET_OFFENDER_NOMIS_PROFILES, 
    GET_VIPER_SCORES,
    SELECT_OFFENDER, 
} from '../constants/actions';

const defaultState = {
    selected: {},
    profiles: [],
    viperScores: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case GET_OFFENDER_NOMIS_PROFILES:
            return {...state, profiles: payload };
        case GET_VIPER_SCORES:
            return {...state, viperScores: payload };
        case SELECT_OFFENDER:
            return {...state, selected: payload };
        default:
            return state;
    }
}


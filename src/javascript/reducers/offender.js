import { GET_OFFENDER_NOMIS_PROFILES, GET_VIPER_SCORES } from '../constants/actions';

const defaultState = {
    selectedOffender: {},
    offendersProfiles: [],
    viperScores: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_OFFENDER_NOMIS_PROFILES:
            return {...state, offendersProfiles: action.payload };
        case GET_VIPER_SCORES:
            return {...state, viperScores: action.payload };
        default:
            return state;
    }
}


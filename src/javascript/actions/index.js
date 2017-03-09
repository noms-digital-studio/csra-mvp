import { 
    GET_QUESTIONS,
    GET_OFFENDER_NOMIS_PROFILES,
    GET_VIPER_SCORES
} from '../constants/actions';

import Questions from '../fixtures/questions.json';

import { offenderNomisProfiles, viperScores } from '../services';

export const getQuestions = (data = Questions) => ({ type: GET_QUESTIONS, payload: data });

export const getOffenderNomisProfiles = (profiles = offenderNomisProfiles()) => {
    return { type: GET_OFFENDER_NOMIS_PROFILES, payload: profiles.output };
};

export const getViperScores = (scores = viperScores()) => {
    return { type: GET_VIPER_SCORES, payload: scores };
};



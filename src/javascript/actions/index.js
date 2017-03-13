import {
    GET_QUESTIONS,
    GET_OFFENDER_NOMIS_PROFILES,
    GET_VIPER_SCORES,
    SELECT_OFFENDER,
} from '../constants/actions';

import Questions from '../fixtures/questions.json';

import { offenderNomisProfiles, viperScores } from '../services';

export const getQuestions = (data = Questions) => ({ type: GET_QUESTIONS, payload: data });

export const getOffenderNomisProfiles = (profiles = offenderNomisProfiles()) => ({ type: GET_OFFENDER_NOMIS_PROFILES, payload: profiles.output });

export const getViperScores = (scores = viperScores()) => ({ type: GET_VIPER_SCORES, payload: scores });

export const selectOffender = offender => ({ type: SELECT_OFFENDER, payload: offender });


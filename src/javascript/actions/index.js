import {
  GET_QUESTIONS,
  GET_OFFENDER_NOMIS_PROFILES,
  GET_VIPER_SCORES,
  SELECT_OFFENDER,
  SIGN_IN,
  SIGN_OUT,
  ADD_PRISONER,
  CONFIRM_PRISONER,
} from '../constants/actions';

import Questions from '../fixtures/questions.json';

import { offenderNomisProfiles, viperScores } from '../services';

export const getQuestions = (data = Questions) => ({ type: GET_QUESTIONS, payload: data });

export const getOffenderNomisProfiles = (profiles = offenderNomisProfiles()) => ({
  type: GET_OFFENDER_NOMIS_PROFILES,
  payload: profiles.output,
});

export const getViperScores = (scores = viperScores()) => ({
  type: GET_VIPER_SCORES,
  payload: scores,
});

export const selectOffender = offender => ({ type: SELECT_OFFENDER, payload: offender });

export const signIn = user => ({ type: SIGN_IN, payload: user });

export const signOut = () => ({ type: SIGN_OUT });

export const addPrisoner = prisoner => {
  return {type: ADD_PRISONER, payload: prisoner}
};

export const confirmPrisoner = prisonerData => {
  const prisoner = {
    NOMS_Number: prisonerData['nomis-id'],
    Surname: prisonerData['last-name'],
    First_Name: prisonerData['first-name'],
    Date_of_Birth: `${prisonerData['dob-day']}-${prisonerData['dob-month']}-${prisonerData['dob-year']}`
  };

  return {type: CONFIRM_PRISONER, payload: prisoner};
};

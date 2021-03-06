import {
  signIn,
  signOut,
  getAssessmentQuestions,
  getHealthAssessmentQuestions,
  getOffenderNomisProfiles,
  getViperScores,
  selectOffender,
  addPrisoner,
  confirmPrisoner,
  saveRiskAssessmentAnswer,
  saveHealthcareAssessmentAnswer,
  completeAssessmentFor,
  saveExitPoint,
} from '../../../src/javascript/actions';

import csraQuestions
  from '../../../src/javascript/fixtures/csra-questions.json';
import healthcareQuestions
  from '../../../src/javascript/fixtures/healthcare-questions.json';

describe('Actions', () => {
  describe('#getAssessmentQuestions', () => {
    it('return a GET_ASSESSMENT_QUESTIONS action', () => {
      expect(getAssessmentQuestions(csraQuestions)).to.eql({
        type: 'GET_ASSESSMENT_QUESTIONS',
        payload: csraQuestions,
      });
    });
  });

  describe('#getHealthAssessmentQuestions', () => {
    it('return a GET_HEALTH_ASSESSMENT_QUESTIONS action', () => {
      expect(getHealthAssessmentQuestions(healthcareQuestions)).to.eql({
        type: 'GET_HEALTH_ASSESSMENT_QUESTIONS',
        payload: healthcareQuestions,
      });
    });
  });

  describe('#getOffenderNomisProfiles', () => {
    it('return a GET_OFFENDER_NOMIS_PROFILES action', () => {
      const profiles = {
        output: [
          {
            NOMS_Number: 'foo',
            Surname: 'foobar',
            First_Name: 'foobaz',
            Date_of_Birth: 'foo-age',
          },
        ],
      };

      expect(getOffenderNomisProfiles(profiles)).to.eql({
        type: 'GET_OFFENDER_NOMIS_PROFILES',
        payload: profiles.output,
      });
    });
  });

  describe('#getViperScores', () => {
    it('returns a GET_VIPER_SCORES action', () => {
      const scores = { output: [{ nomisId: 'FOO', viperScore: 1 }] };
      expect(getViperScores(scores)).to.eql({
        type: 'GET_VIPER_SCORES',
        payload: scores.output,
      });
    });
  });

  describe('#selectOffender', () => {
    it('returns a SELECT_OFFENDER action', () => {
      const offender = {
        NOMS_Number: 'foo',
        Surname: 'foobar',
        First_Name: 'foobaz',
        Date_of_Birth: 'foo-age',
      };

      expect(selectOffender(offender)).to.eql({
        type: 'SELECT_OFFENDER',
        payload: offender,
      });
    });
  });

  describe('#signIn', () => {
    it('returns a SIGN_IN action', () => {
      const user = 'Foo bar';
      expect(signIn(user)).to.eql({ type: 'SIGN_IN', payload: user });
    });
  });

  describe('#signOut', () => {
    it('returns a SIGN_OUT action', () => {
      expect(signOut()).to.eql({ type: 'SIGN_OUT' });
    });
  });

  describe('#addPrisoner', () => {
    it('returns a ADD_PRISONER action', () => {
      const prisoner = {
        'first-name': 'foo',
        'last-name': 'bar',
        'dob-day': '01',
        'dob-month': '10',
        'dob-year': '1997',
        'nomis-id': 'AA12345',
      };

      expect(addPrisoner(prisoner)).to.eql({
        type: 'ADD_PRISONER',
        payload: prisoner,
      });
    });
  });

  describe('#confirmPrisoner', () => {
    const prisonerData = {
      'first-name': 'foo',
      'last-name': 'bar',
      'dob-day': '01',
      'dob-month': '10',
      'dob-year': '1997',
      'nomis-id': 'AA12345',
    };

    const prisoner = {
      NOMS_Number: 'AA12345',
      Surname: 'bar',
      First_Name: 'foo',
      Date_of_Birth: '01-10-1997',
    };

    expect(confirmPrisoner(prisonerData)).to.eql({
      type: 'CONFIRM_PRISONER',
      payload: prisoner,
    });
  });

  describe('#saveRiskAssessmentAnswer', () => {
    it('returns a SAVE_CSRA_ANSWER action', () => {
      const section = 'foo-risk';
      const answer = { confirmation: 'accept' };

      expect(saveRiskAssessmentAnswer(section, answer)).to.eql({
        type: 'SAVE_CSRA_ANSWER',
        payload: { [section]: answer },
      });
    });
  });

  describe('#saveHealthcareAssessmentAnswer', () => {
    it('returns a SAVE_HEALTHCARE_ANSWER action', () => {
      const section = 'foo-risk';
      const answer = { confirmation: 'accept' };

      expect(saveHealthcareAssessmentAnswer(section, answer)).to.eql({
        type: 'SAVE_HEALTHCARE_ANSWER',
        payload: { [section]: answer },
      });
    });
  });

  describe('#completeAssessmentFor', () => {
    it('returns a COMPLETE_ASSESSMENT action', () => {
      const outcome = {
        nomisId: 'foo-id',
        recommendation: 'foo-recommendation',
        rating: 'foo-rating',
        reasons: ['foo-reason'],
      };
      expect(completeAssessmentFor(outcome)).to.eql({
        type: 'COMPLETE_ASSESSMENT',
        payload: outcome,
      });
    });
  });

  describe('#saveExitPoint', () => {
    it('returns a SAVE_EXIT_POINT action', () => {
      const riskFactor = 'foo-risk-factor';
      expect(saveExitPoint(riskFactor)).to.eql({
        type: 'SAVE_EXIT_POINT',
        payload: riskFactor,
      });
    });
  });
});

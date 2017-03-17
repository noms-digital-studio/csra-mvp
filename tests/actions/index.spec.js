import {
  signIn,
  signOut,
  getQuestions,
  getOffenderNomisProfiles,
  getViperScores,
  selectOffender,
  addPrisoner,
  confirmPrisoner,
  saveAnswer,
} from '../../src/javascript/actions';
import questions from '../../src/javascript/fixtures/questions.json';

describe('Actions', () => {
  describe('#getQuestions', () => {
    it('return a GET_QUESTIONS action', () => {
      expect(getQuestions(questions)).to.eql({ type: 'GET_QUESTIONS', payload: questions });
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
      const scores = [{ nomisId: 'FOO', viperScore: 1 }];
      expect(getViperScores(scores)).to.eql({
        type: 'GET_VIPER_SCORES',
        payload: scores,
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

      expect(selectOffender(offender)).to.eql({ type: 'SELECT_OFFENDER', payload: offender });
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

      expect(addPrisoner(prisoner)).to.eql({ type: 'ADD_PRISONER', payload: prisoner });
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

    expect(confirmPrisoner(prisonerData)).to.eql({ type: 'CONFIRM_PRISONER', payload: prisoner });
  });

  describe('saveAnswer', () => {
    it('returns a SAVE_ANSWER action', () => {
      const riskIndicator = 'foo-risk';
      const answer = { confirmation: 'accept' };

      expect(saveAnswer(riskIndicator, answer)).to.eql({
        type: 'SAVE_ANSWER',
        payload: { [riskIndicator]: answer },
      });
    });
  });
});

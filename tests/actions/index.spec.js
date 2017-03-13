import {
    getQuestions,
    getOffenderNomisProfiles,
    getViperScores,
    selectOffender,
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
});

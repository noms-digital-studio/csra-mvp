import { getQuestions, getOffenderNomisProfiles, getViperScores } from '../../src/javascript/actions';
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
                        "NOMS_Number": "foo",
                        "Surname": "foobar",
                        "First_Name": "foobaz",
                        "Date_of_Birth": "foo-age"
                    }
                ]
            };

            expect(getOffenderNomisProfiles(profiles)).to.eql({
                type: 'GET_OFFENDER_NOMIS_PROFILES',
                payload: [
                    {
                        "NOMS_Number": "foo",
                        "Surname": "foobar",
                        "First_Name": "foobaz",
                        "Date_of_Birth": "foo-age"
                    }
                ]
            });
        });
    });

    describe('#getViperScores', () => {
        it('returns a GET_VIPER_SCORES action', () => {
            const scores = [{ nomisId: "FOO", viperScore: 1 }];
            expect(getViperScores(scores)).to.eql({
                type: "GET_VIPER_SCORES",
                payload: [{ nomisId: "FOO", viperScore: 1 }]
            });
        });
    });

});
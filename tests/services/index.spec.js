import { calculateRiskFor, viperScores } from '../../src/javascript/services';
import localViperScores from '../../src/javascript/fixtures/viper.json';
import defaultViperScores from '../fixtures/viperScore.json';

describe('Services', () => {

    describe('#calculateRiskFor', () => {

        it('returns a low risk rating', () => {
            expect(calculateRiskFor('nomisIdForLowRiskPerson1', defaultViperScores)).to.equal('low');
            expect(calculateRiskFor('nomisIdForLowRiskPerson2', defaultViperScores)).to.equal('low');
        });

        it('returns a med risk rating', () => {
            expect(calculateRiskFor('nomisIdForMediumRiskPerson1', defaultViperScores)).to.equal('medium');
            expect(calculateRiskFor('nomisIdForMediumRiskPerson2', defaultViperScores)).to.equal('medium');
        });

        it('returns a high risk rating', () => {
            expect(calculateRiskFor('nomisIdForHighRiskPerson1', defaultViperScores)).to.equal('high');
            expect(calculateRiskFor('nomisIdForHighRiskPerson2', defaultViperScores)).to.equal('high');
        });

        context('when a score doesn\'t exist for a given nomisId', () => {
            it('returns unknown', () => {
                expect(calculateRiskFor('nomisIdForUnknown', defaultViperScores)).to.equal('unknown');
            });
        });
    });

    describe('#viperScores', () => {
        afterEach(() => {
            sessionStorage.clear();
        });

        context('when viperScores are available in browser storage', () => {
            it('returns viper scores from browser storage', () => {
                const scores = JSON.stringify(defaultViperScores);
                
                sessionStorage.setItem("viperScores", scores);

                expect(viperScores()).to.eql(JSON.parse(scores));
            });
        });

        context('when viperScores are unavailable in browser storage', () => {
            it('returns viperScores found in a local json file', () => {
                expect(viperScores()).to.eql(localViperScores);
            });
        });

    });

});
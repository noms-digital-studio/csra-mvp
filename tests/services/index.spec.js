import {calculateRiskFor, viperScores, offenderNomisData} from '../../src/javascript/services';
import localViperScores from '../../src/javascript/fixtures/viper.json';
import localOffenderData from '../../src/javascript/fixtures/nomis.json';
import testViperScores from '../fixtures/viperScore.json';
import testOffenderData from '../fixtures/offenderData.json';

describe('Services', () => {

    describe('#calculateRiskFor', () => {

        it('returns a low risk rating', () => {
            expect(calculateRiskFor('nomisIdForLowRiskPerson1', testViperScores)).to.equal('low');
            expect(calculateRiskFor('nomisIdForLowRiskPerson2', testViperScores)).to.equal('low');
        });

        it('returns a med risk rating', () => {
            expect(calculateRiskFor('nomisIdForMediumRiskPerson1', testViperScores)).to.equal('medium');
            expect(calculateRiskFor('nomisIdForMediumRiskPerson2', testViperScores)).to.equal('medium');
        });

        it('returns a high risk rating', () => {
            expect(calculateRiskFor('nomisIdForHighRiskPerson1', testViperScores)).to.equal('high');
            expect(calculateRiskFor('nomisIdForHighRiskPerson2', testViperScores)).to.equal('high');
        });

        context('when a score doesn\'t exist for a given nomisId', () => {
            it('returns unknown', () => {
                expect(calculateRiskFor('nomisIdForUnknown', testViperScores)).to.equal('unknown');
            });
        });
    });

    describe('#viperScores', () => {

        context('when viperScores are available in browser storage', () => {
            after(() => sessionStorage.clear());

            it('returns viper scores from browser storage', () => {
                const scores = JSON.stringify(testViperScores);

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

    describe('#offenderNomisData', () => {

        context('when offenderNomisData is available in browser storage', () => {
            after(() => sessionStorage.clear());

            it('returns offender NOMIS data form browser storage', () => {
                const offenderData = JSON.stringify(testOffenderData);

                sessionStorage.setItem("offenderData", offenderData);

                expect(offenderNomisData()).to.eql(JSON.parse(offenderData));

            })
        });

        context('when offenderNomisData is unavailable in browser storage', () => {
            it('returns offenderNomisData found in a local json file', () => {
                expect(offenderNomisData()).to.eql(localOffenderData);
            });
        });

    });
});
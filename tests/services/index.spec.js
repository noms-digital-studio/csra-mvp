import { calculateRiskFor, getViperScores } from '../../src/javascript/services';
import localViperScores from '../../src/javascript/fixtures/viper.json';

const viperScores = [
    {
        "nomisId": "nomisIdForLowRiskPerson1",
        "viperScore": "0.00"
    },
    {
        "nomisId": "nomisIdForLowRiskPerson2",
        "viperScore": "0.50"
    },
    {
        "nomisId": "nomisIdForMediumRiskPerson1",
        "viperScore": "0.51"
    },

    {
        "nomisId": "nomisIdForMediumRiskPerson2",
        "viperScore": "0.75"
    },
    {
        "nomisId": "nomisIdForHighRiskPerson1",
        "viperScore": "0.76"
    },
    {
        "nomisId": "nomisIdForHighRiskPerson2",
        "viperScore": "1.0"
    }
];

describe('Services', () => {

    describe('#calculateRiskFor', () => {

        it('returns a low risk rating', () => {
            expect(calculateRiskFor('nomisIdForLowRiskPerson1', viperScores)).to.equal('low');
            expect(calculateRiskFor('nomisIdForLowRiskPerson2', viperScores)).to.equal('low');
        });

        it('returns a med risk rating', () => {
            expect(calculateRiskFor('nomisIdForMediumRiskPerson1', viperScores)).to.equal('medium');
            expect(calculateRiskFor('nomisIdForMediumRiskPerson2', viperScores)).to.equal('medium');
        });

        it('returns a high risk rating', () => {
            expect(calculateRiskFor('nomisIdForHighRiskPerson1', viperScores)).to.equal('high');
            expect(calculateRiskFor('nomisIdForHighRiskPerson2', viperScores)).to.equal('high');
        });

        context('when a score doesn\'t exist for a given nomisId', () => {
            it('returns unknown', () => {
                expect(calculateRiskFor('nomisIdForUnknown', viperScores)).to.equal('unknown');
            });
        });
    });

    describe('#getViperScores', () => {
        afterEach(() => {
            sessionStorage.clear();
        });

        context('when viperScores are available in browser storage', () => {
            it('returns viper scores from browser storage', () => {
                const scores = JSON.stringify(viperScores);
                
                sessionStorage.setItem("viperScores", scores);

                expect(getViperScores()).to.eql(JSON.parse(scores));
            });
        });

        context('when viperScores are unvailable in browser storage', () => {
            it('returns viperScores found in a local json file', () => {
                expect(getViperScores()).to.eql(localViperScores);
            });
        });

    })
});
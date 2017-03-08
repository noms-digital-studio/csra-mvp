import { calculateRiskFor } from '../../src/javascript/services'

describe('Services', () => {

    describe('#calculateRiskFor', () => {
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
            })
        });
        
    });
});
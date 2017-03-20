import { canContinueAssessment } from '../../src/javascript/services/index';

describe('Decision Engine', () => {
  context('Viper score', () => {
    it('does not continue when the viper score is high', () => {
      const question = {
        riskIndicator: 'risk-of-violence',
        singleCellPredicate: { type: 'VIPER_SCORE', value: 'high' },
      };
      const answers = {};
      const viperScore = 'high';

      expect(canContinueAssessment(question, answers, viperScore)).to.equal(false);
    });

    it('continues when the viper score is low', () => {
      const question = {
        riskIndicator: 'risk-of-violence',
        singleCellPredicate: { type: 'VIPER_SCORE', value: 'high' },
      };
      const answers = {};
      const viperScore = 'low';

      expect(canContinueAssessment(question, answers, viperScore)).to.equal(true);
    });
  });

  context('Single Question Decision', () => {
    it('continues when the is no singleCellPredicate', () => {
      const question = {
        riskIndicator: 'introduction',
      };
      const answers = {};
      const viperScore = undefined;

      expect(canContinueAssessment(question, answers, viperScore)).to.equal(true);
    });

    it('continues when the answer does not satisfy the singleCellPredicate', () => {
      const question = {
        riskIndicator: 'vulnerability',
        singleCellPredicate: { type: 'SINGLE_QUESTION', value: 'yes' },
      };
      const answers = {
        vulnerability: 'no',
      };
      const viperScore = undefined;

      expect(canContinueAssessment(question, answers, viperScore)).to.equal(true);
    });

    it('does not continues when the answer satisfies the singleCellPredicate', () => {
      const question = {
        riskIndicator: 'vulnerability',
        singleCellPredicate: { type: 'SINGLE_QUESTION', value: 'yes' },
      };
      const answers = {
        vulnerability: 'yes',
      };
      const viperScore = undefined;

      expect(canContinueAssessment(question, answers, viperScore)).to.equal(false);
    });
  });

  context('Multi Question Decision', () => {
    it('continues when the answer does not satisfy the singleCellPredicate', () => {
      const question = {
        riskIndicator: 'prejudice',
        singleCellPredicate: {
          type: 'MULTI_DEPENDENT_QUESTION',
          value: 'yes',
          dependents: ['gangs', 'drugs'],
        },
      };

      const answers = {
        prejudice: 'yes',
        gangs: 'no',
        drugs: 'no',
      };

      const viperScore = undefined;

      expect(canContinueAssessment(question, answers, viperScore)).to.equal(true);
    });

    it('does not continues when the answer satisfies the singleCellPredicate', () => {
      const question = {
        riskIndicator: 'prejudice',
        singleCellPredicate: {
          type: 'MULTI_DEPENDENT_QUESTION',
          value: 'yes',
          dependents: ['gangs', 'drugs'],
        },
      };

      const answers = {
        prejudice: 'yes',
        gangs: 'yes',
        drugs: 'yes',
      };

      const viperScore = undefined;

      expect(canContinueAssessment(question, answers, viperScore)).to.equal(false);
    });
  });
});

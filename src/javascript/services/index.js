import localViperScores from '../fixtures/viper.json';

export const calculateRiskFor = (nomisId, riskScores = []) => {
    const LOW_RISK_LEVEL = 0.50;
    const MEDIUM_RISK_LEVEL = 0.75;
    const offenderRiskScore = riskScores.find((offender) => offender.nomisId === nomisId);

    if( !offenderRiskScore )  return 'unknown';
    
    const { viperScore } = offenderRiskScore;

    if (viperScore <= LOW_RISK_LEVEL) {
        return 'low';
    } else if (viperScore > LOW_RISK_LEVEL && viperScore <= MEDIUM_RISK_LEVEL) {
        return 'medium';
    }

    return 'high';
}


export const getViperScores = () => {
    if (sessionStorage.getItem('viperScores')) {
        return JSON.parse(sessionStorage.getItem('viperScores'));
    } else {
        return localViperScores;
    }
}
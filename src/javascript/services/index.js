import defaultViperScores from '../fixtures/viper.json';
import defaultOffenderData from '../fixtures/nomis.json';

export const calculateRiskFor = (nomisId, riskScores = []) => {
    const LOW_RISK_LEVEL = 0.50;
    const MEDIUM_RISK_LEVEL = 0.75;
    const offenderRiskScore = riskScores.find((offender) => offender.nomisId === nomisId);

    if (!offenderRiskScore)  return 'unknown';

    const {viperScore} = offenderRiskScore;

    if (viperScore <= LOW_RISK_LEVEL) {
        return 'low';
    } else if (viperScore > LOW_RISK_LEVEL && viperScore <= MEDIUM_RISK_LEVEL) {
        return 'medium';
    }

    return 'high';
};


export const viperScores = () => {
    if (sessionStorage.getItem('viperScores')) {
        return JSON.parse(sessionStorage.getItem('viperScores'));
    }

    return defaultViperScores;
};

export const readSingleFile = (file, callback) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ({target: {result}}) => {
        callback(null, result);
    };

    reader.onerror = (error) => {
        callback(error.message, null);
    };

    reader.readAsText(file);
};

export const storeData = (key, data) => {
    sessionStorage.setItem(key, data);
};

export const offenderNomisData = () => {
    if (sessionStorage.getItem('offenderData')) {
        return JSON.parse(sessionStorage.getItem('offenderData'));
    }

    return defaultOffenderData;
};


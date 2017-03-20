import defaultViperScores from '../fixtures/viper.json';
import defaultOffenderProfiles from '../fixtures/nomis.json';

export const calculateRiskFor = (nomisId, riskScores = []) => {
  const LOW_RISK_THRESHOLD = 0.59;
  const offenderRiskScore = riskScores.find(offender => offender.nomisId === nomisId);

  if (!offenderRiskScore) return 'unknown';

  const { viperScore } = offenderRiskScore;

  if (viperScore <= LOW_RISK_THRESHOLD) {
    return 'low';
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
  reader.onload = ({ target: { result } }) => {
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

export const offenderNomisProfiles = () => {
  if (sessionStorage.getItem('offenderProfiles')) {
    return JSON.parse(sessionStorage.getItem('offenderProfiles'));
  }

  return defaultOffenderProfiles;
};

export const clearBrowserStorage = () => {
  sessionStorage.clear();
  localStorage.clear();
};

export const canContinueAssessment = (question, answers, viperScore) => {
  if (!question.singleCellPredicate) {
    return true;
  }

  if (question.singleCellPredicate.type === 'SINGLE_QUESTION') {
    return question.singleCellPredicate.value !== answers[question.riskIndicator];
  }

  if (question.singleCellPredicate.type === 'MULTI_DEPENDENT_QUESTION') {
    return !([...question.singleCellPredicate.dependents, question.riskIndicator].every(
      riskIndicator => answers[riskIndicator] === question.singleCellPredicate.value,
    ));
  }

  if (viperScore === question.singleCellPredicate.value) {
    return false;
  }

  return true;
};

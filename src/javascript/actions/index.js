import { 
    GET_QUESTIONS,
    STORE_ANSWER 
} from '../constants/actions';


// Temporarly
import Questions from '../fixtures/questions.json';


export const getQuestions = (data = Questions) => ({ type: GET_QUESTIONS, payload: data });
export const storeAnswer = (riskIndicator, data) => ({ type: STORE_ANSWER, payload: { riskIndicator, data } });


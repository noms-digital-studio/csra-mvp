import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState from 'redux-sessionstorage';



import questionnaireReducer from '../reducers/questionnaire';
import offenderReducer from '../reducers/offender';

const enhancer = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(hashHistory)
  ),
  persistState()
);

const reducers = combineReducers({
  routing: routerReducer,
  questions: questionnaireReducer,
  offender: offenderReducer,
});


export default createStore(reducers, enhancer);
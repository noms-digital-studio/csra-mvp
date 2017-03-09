import { compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import questionnaireReducer from '../reducers/questionnaire';
import offenderReducer from '../reducers/offender';

// import persistState from 'redux-localstorage';


const reducers = combineReducers({
  routing: routerReducer,
  questions: questionnaireReducer,
  offender: offenderReducer,
});


export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
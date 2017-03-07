import { compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import questionaireReducer from '../reducers/questionaire';
import prisonerReducer from '../reducers/prisoner';

// import persistState from 'redux-localstorage';


const reducers = combineReducers({
  routing: routerReducer,
  questions: questionaireReducer,
  prisoner: prisonerReducer,
});


export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
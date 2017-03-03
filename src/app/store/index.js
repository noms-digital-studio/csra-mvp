import { compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import questionaireReducer from '../reducers/questionaire';

// import persistState from 'redux-localstorage';


const reducers = combineReducers({
  routing: routerReducer,
  questions: questionaireReducer
});


export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
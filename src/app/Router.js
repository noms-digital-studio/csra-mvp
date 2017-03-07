import React from 'react';
import {
  Router,
  Route,
  hashHistory,
} from 'react-router';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './templates/Main';

//Pages
import LoadData from './pages/LoadData';
import Signin from './pages/Singin';
import Question from './pages/Question';


//Routes
import { SIGNIN, ASSESSMENT } from './constants/routes';


export default (store) => {
    const history = syncHistoryWithStore(hashHistory, store);

    return (
         <Provider store={store}>
            <Router history={history}>
                <Route component={Layout}>
                    <Route path="/" name="Sign in" component={Signin} />
                    <Route path="load-data" name="load-data" component={LoadData} />                    
                    <Route path={SIGNIN} name="Sign in" component={Signin} />
                    <Route name="assessment">
                        <Route path="assessment/:section" component={Question} />
                    </Route>
                </Route>
            </Router>
        </Provider>
    );
}


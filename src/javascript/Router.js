import React from 'react';
import {
  Router,
  Route,
  hashHistory,
} from 'react-router';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './containers/Main';

import LoadData from './pages/LoadData';
import Signin from './pages/Singin';
import Question from './pages/Question';
import Summary from './pages/Summary.jsx';
import Error404 from './pages/Error404';


export default (store) => {
    const history = syncHistoryWithStore(hashHistory, store);

    return (
         <Provider store={store}>
            <Router history={history}>
                <Route component={Layout}>
                    <Route path="/" name="Sign in" component={Signin} />
                    <Route path="/load-data" name="load-data" component={LoadData} />                    
                    <Route path="/signin" name="Sign in" component={Signin} />
                    <Route path="/assessment/:section" component={Question} />
                    <Route path="/summary" component={Summary} />
                    <Route path="*" name="404"  component={Error404}/>
                </Route>
            </Router>
        </Provider>
    );
}


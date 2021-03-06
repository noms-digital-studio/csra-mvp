import 'es5-shim';
import 'babel-polyfill';
import { render } from 'react-dom';

import store from './store';
import routes from './Router';

import Fonts from '../vendors/css/fonts.css';
import Tempalte from '../vendors/css/govuk-template.css';
import SassStyles from '../scss/application.scss';

render(routes(store), document.getElementById('mountNode'));

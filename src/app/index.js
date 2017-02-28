import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root.jsx';


import Fonts from '../vendors/css/fonts.css';
// import TemplatePrint from '../vendors/css/govuk-template-print.css';
import Tempalte from '../vendors/css/govuk-template.css';
import SassStyles from '../scss/application.scss';


ReactDOM.render(
  <Root />,
  document.getElementById('mountNode')
);
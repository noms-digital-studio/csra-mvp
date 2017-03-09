import React, { PropTypes } from 'react';

import Static from './Static';
import ViolenceRisk from './ViolenceRisk';


const selectAside = (template, data) => {
    switch(template) {
        case 'violence_risk':
            return <ViolenceRisk {...data} />
        case 'static':
            return <Static {...data} />
        default: 
            return null;
    }
};


const Aside = ({ template, title, description }) => {
    return selectAside(template, {title, description});
}

Aside.propTypes = {
    template: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string
};


export default Aside;


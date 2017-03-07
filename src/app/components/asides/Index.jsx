import React from 'react';

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


Aside.defaultProps = {
    data: {}
};

export default Aside;


import React from 'react';

import Static from './Static';
import ViolenceRisk from './ViolenceRisk';


const asideSelector = (type, data) => {
    switch(type) {
        case 'violence_risk':
            return <ViolenceRisk {...data} />
        case 'static':
            return <Static {...data} />
        default: 
            return null;
    }
};


const Aside = ({ type, title, description }) => {
    return asideSelector(type, {title, description});
}


Aside.defaultProps = {
    data: {}
};

export default Aside;


import uuid from 'uuid/v4';
import React from 'react';

export const newLineToParagraph = (text = '') => {
  return text.split('\n').map((item, index) => (
    <p key={uuid()}>{item}</p>
  ));
};

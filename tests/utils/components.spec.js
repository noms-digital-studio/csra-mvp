import React from 'react';
import { shallow } from 'enzyme';
import { newLineToParagraph } from '../../src/javascript/utils/components';

describe('Component Utils', () => {
  describe('#newLineToParagraph', () => {
    it('generates a paragraph for every "\\n"', () => {
      const text = 'foo \n bar';
      const component = newLineToParagraph(text);
      const wrapper = shallow(<div>{component}</div>);

      expect(wrapper.find('p').length).to.equal(2);
    });
  });
});

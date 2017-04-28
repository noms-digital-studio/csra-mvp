import React from 'react';
import {mount} from 'enzyme';

import Viper from '../../../src/javascript/containers/Viper';
import Aside from '../../../src/javascript/components/asides/Index';

describe('<Viper />', () => {

  const content = {
    "low": {
      "title": "low title",
      "description": "low desc"
    },
    "high": {
      "title": "high title",
      "description": "high desc"
    },
    "unknown": {
      "title": "unknown title",
      "description": "unknown desc"
    }

  };

  it('renders the title for low viper rating', () => {
    const wrapper = mount(<Viper content={content} viperScore='low'/>);
    expect(wrapper.text()).to.contain('low title');
  });

  it('renders the title for high viper rating', () => {
    const wrapper = mount(<Viper content={content} viperScore='high'/>);
    expect(wrapper.text()).to.contain('high title');
  });

  it('renders the title for unknown viper rating', () => {
    const wrapper = mount(<Viper content={content} viperScore='unknown'/>);
    expect(wrapper.text()).to.contain('unknown title');
  });

  it('renders the description for low viper rating', () => {
    const wrapper = mount(<Viper content={content} viperScore='low'/>);
    expect(wrapper.text()).to.contain('low desc');
  });

  it('renders the description for high viper rating', () => {
    const wrapper = mount(<Viper content={content} viperScore='high'/>);
    expect(wrapper.text()).to.contain('high desc');
  });

  it('renders the an aside', () => {
    const props = {
      template: 'template',
    };
    const wrapper = mount(<Viper content={content} viperScore='high' aside={props}/>);
    expect(wrapper.find(Aside).length).be.equal(1);
  });

  it('handles form submission', () => {
    const callback = sinon.spy();
    const wrapper = mount(<Viper content={content} viperScore='high' onSubmit={callback}/>);

    wrapper.find('form').simulate('submit');

    expect(callback.calledOnce).to.be.true;
  });

  it('pre-populates the forms if data is available', () => {
    const wrapper = mount(<Viper content={content} viperScore='high' formDefaults={{ confirmation: 'accepted' }} />);

    expect(wrapper.find('input[type="checkbox"]').node.checked).to.equal(true, 'Check box is checked');
  });

});

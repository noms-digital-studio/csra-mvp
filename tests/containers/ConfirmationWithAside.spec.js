import React from 'react';
import { mount } from 'enzyme';

import CofirmationWithAside from '../../src/javascript/containers/ConfirmationWithAside';
import Aside from '../../src/javascript/components/asides/Index';

describe('<CofirmationWithAside />', () => {
  it('renders the title', () => {
    const wrapper = mount(<CofirmationWithAside title="foo-title" />);
    expect(wrapper.text()).to.contain('foo-title');
  });

  it('renders the description', () => {
    const wrapper = mount(<CofirmationWithAside description="foo-description" />);
    expect(wrapper.text()).to.contain('foo-description');
  });

  it('renders the an aside', () => {
    const props = {
      template: 'template',
    };
    const wrapper = mount(<CofirmationWithAside aside={props} />);
    expect(wrapper.find(Aside).length).be.equal(1);
  });

  it('handles form submission', () => {
    const callback = sinon.spy();
    const wrapper = mount(<CofirmationWithAside onSubmit={callback} />);

    wrapper.find('form').simulate('submit');

    expect(callback.calledOnce).to.be.true;
  });
});

import React from 'react';
import { mount } from 'enzyme';

import HealthAssessment from '../../src/javascript/containers/HealthAssessment';
import Aside from '../../src/javascript/components/asides/Index';

describe('<HealthAssessment />', () => {
  it('renders the title', () => {
    const wrapper = mount(<HealthAssessment title="foo-title" />);
    expect(wrapper.text()).to.contain('foo-title');
  });

  it('renders the description', () => {
    const wrapper = mount(<HealthAssessment description="foo-description" />);
    expect(wrapper.text()).to.contain('foo-description');
  });

  it('renders the an aside', () => {
    const props = {
      template: 'template',
    };
    const wrapper = mount(<HealthAssessment aside={props} />);
    expect(wrapper.find(Aside).length).be.equal(1);
  });

  it('handles form submission', () => {
    const callback = sinon.spy();
    const wrapper = mount(<HealthAssessment onSubmit={callback} />);

    wrapper.find('form').simulate('submit');

    expect(callback.calledOnce).to.be.true;
  });

  it('pre-populates the forms if data is available', () => {
    const wrapper = mount(
      <HealthAssessment formDefaults={{ answer: 'yes', assessor: 'foo-name' }} />,
    );

    expect(wrapper.find('[data-input="yes"]').node.checked).to.equal(true, 'radio button selected');

    expect(wrapper.find('input[type="text"]').node.value).to.equal('foo-name');
  });
});

import React from 'react';
import { mount } from 'enzyme';

import QuestionWithComments from '../../src/javascript/containers/QuestionWithComments';
import Aside from '../../src/javascript/components/asides/Index';

describe('<QuestionWithComments />', () => {
  it('renders the title', () => {
    const wrapper = mount(<QuestionWithComments title="foo-title" />);
    expect(wrapper.text()).to.contain('foo-title');
  });

  it('renders the description', () => {
    const wrapper = mount(<QuestionWithComments description="foo-description" />);
    expect(wrapper.text()).to.contain('foo-description');
  });

  it('renders the an aside', () => {
    const props = {
      template: 'template',
    };
    const wrapper = mount(<QuestionWithComments aside={props} />);
    expect(wrapper.find(Aside).length).be.equal(1);
  });

  it('handles form submission', () => {
    const callback = sinon.spy();
    const wrapper = mount(<QuestionWithComments onSubmit={callback} />);

    wrapper.find('form').simulate('submit');

    expect(callback.calledOnce).to.be.true;
  });

  it('pre-populates the forms if data is available', () => {
    const wrapper = mount(<QuestionWithComments formDefaults={{ answer: 'yes', comments: 'foo-comment' }} />);

    expect(wrapper.find('[data-input="yes"]').node.checked).to.equal(true, 'radio button selected');

    expect(wrapper.find('textarea').node.value).to.equal('foo-comment');
  });
});

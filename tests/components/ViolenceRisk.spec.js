import React from 'react';
import { mount } from 'enzyme';

import { ViolenceRisk } from '../../src/javascript/components/asides/ViolenceRisk';

describe('<ViolenceRisk />', () => {
  it('renders the component with a viper rating', () => {
    const wrapper = mount(<ViolenceRisk rating="high" />);
    expect(wrapper.find('[data-viper-rating="high"]').length).to.equal(1);

    expect(wrapper.find('[data-viper-rating]').first().text()).to.equal('high');
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { fakeStore } from '../test-helpers';

import ConnectedAddOffender, { AddOffender } from '../../src/javascript/pages/AddOffender';

const profiles = {
  NOMS_Number: 'foo-id',
  Surname: 'foo-surname',
  First_Name: 'foo-first-name',
  Date_of_Birth: 'foo-age',
};

describe('<AddOffender />', () => {
  context('Standalone AddOffender', () => {
    it('accepts a date', () => {
      const date = 'Fooday FooDay FooMonth FooYear';
      const wrapper = shallow(<AddOffender date={date} />);
      expect(wrapper.text()).to.include(date);
    });

    it('fails to submit if fields are missing in the form', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AddOffender onSubmit={callback} />);

      wrapper.find('form').simulate('submit');

      expect(callback.calledOnce).to.be.false;
    });

    it('calls onSubmit callback when for submits successfully', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AddOffender onSubmit={callback} />);
      const expectedCallBackArgument = {
        'first-name': 'foo-first-name',
        'last-name': 'foo-last-name',
        'dob-day': '01',
        'dob-month': '11',
        'dob-year': '1960',
        'nomis-id': 'foo-nomis-id',
      };

      // Fill Form
      Object.keys(expectedCallBackArgument).forEach((key) => {
        wrapper.find(`input[name="${key}"]`).node.value = expectedCallBackArgument[key];
      });

      wrapper.find('form').simulate('submit');

      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith(expectedCallBackArgument));
    });
  });

  // context('Connected AddOffender', () => {
  //   let wrapper;
  //   let store;

  //   beforeEach(() => {
  //     store = fakeStore({
  //       offender: {
  //         profiles,
  //       },
  //     });

  //     wrapper = mount(
  //       <Provider store={store}>
  //         <ConnectedAddOffender />
  //       </Provider>,
  //     );
  //   });

  //   it('accepts and correctly renders profiles', () => {
  //     expect(wrapper.find('[data-profile-row]').length).to.equal(2);

  //     profiles.forEach((profile) => {
  //       const keys = Object.keys(profile);
  //       keys.forEach((key) => {
  //         expect(wrapper.text()).to.include(profile[key]);
  //       });
  //     });
  //   });

  //   it('responds to profile selection', () => {
  //     const profileBtn = wrapper.find('[data-profile-row]').first().find('button');

  //     profileBtn.simulate('click');

  //     expect(
  //       store.dispatch.calledWithMatch({ type: 'SELECT_OFFENDER', payload: profiles[0] }),
  //     ).to.be.true;
  //   });

  //   it('calls actions when component mounts', () => {
  //     expect(
  //       store.dispatch.calledWithMatch({ type: 'GET_VIPER_SCORES', payload: viperScores }),
  //     ).to.be.true;

  //     expect(
  //       store.dispatch.calledWithMatch({
  //         type: 'GET_OFFENDER_NOMIS_PROFILES',
  //         payload: offenderProfiles.output,
  //       }),
  //     ).to.be.true;
  //   });
  // });
});

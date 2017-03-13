import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { fakeStore } from '../test-helpers';

import offenderProfiles from '../../src/javascript/fixtures/nomis.json';
import viperScores from '../../src/javascript/fixtures/viper.json';

import ConnectedDashboard, { Dashboard } from '../../src/javascript/pages/Dashboard';

const profiles = [
  {
    NOMS_Number: 'foo-id',
    Surname: 'foo-surname',
    First_Name: 'foo-first-name',
    Date_of_Birth: 'foo-age',
  },
  {
    NOMS_Number: 'bar-id',
    Surname: 'foo-surname',
    First_Name: 'foo-first-name',
    Date_of_Birth: 'foo-age',
  },
];

describe('<Dashboard />', () => {
  context('Standalone Dashboard', () => {
    it('accepts and correctly renders profiles', () => {
      const wrapper = shallow(<Dashboard profiles={profiles} />);
      expect(wrapper.find('[data-profile-row]').length).to.equal(2);

      profiles.forEach((profile) => {
        const keys = Object.keys(profile);
        keys.forEach((key) => {
          expect(wrapper.text()).to.include(profile[key]);
        });
      });
    });

    it('responds to profile selection', () => {
      const callback = sinon.spy();
      const wrapper = shallow(<Dashboard profiles={profiles} onOffenderSelect={callback} />);

      const profileBtn = wrapper.find('[data-profile-row]').first().find('button');

      profileBtn.simulate('click');

      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith(profiles[0])).to.be.true;
    });

    it('accepts a date', () => {
      const date = 'Fooday FooDay FooMonth FooYear';
      const wrapper = shallow(<Dashboard date={date} />);

      expect(wrapper.text()).to.include(date);
    });

    it('calls actions when component mounts', () => {
      const getViperScores = sinon.spy();
      const getOffenderNomisProfiles = sinon.spy();

      const wrapper = mount(
        <Dashboard
          getViperScores={getViperScores}
          getOffenderNomisProfiles={getOffenderNomisProfiles}
        />,
      );

      expect(getViperScores.calledOnce).to.be.true;
      expect(getOffenderNomisProfiles.calledOnce).to.be.true;
    });
  });

  context('Connected Dashboard', () => {
    let wrapper;
    let store;

    beforeEach(() => {
      store = fakeStore({
        offender: {
          profiles,
        },
      });

      wrapper = mount(
        <Provider store={store}>
          <ConnectedDashboard />
        </Provider>,
      );
    });

    it('accepts and correctly renders profiles', () => {
      expect(wrapper.find('[data-profile-row]').length).to.equal(2);

      profiles.forEach((profile) => {
        const keys = Object.keys(profile);
        keys.forEach((key) => {
          expect(wrapper.text()).to.include(profile[key]);
        });
      });
    });

    it('responds to profile selection', () => {
      const profileBtn = wrapper.find('[data-profile-row]').first().find('button');

      profileBtn.simulate('click');

      expect(
        store.dispatch.calledWithMatch({ type: 'SELECT_OFFENDER', payload: profiles[0] }),
      ).to.be.true;
    });

    it('calls actions when component mounts', () => {
      expect(
        store.dispatch.calledWithMatch({ type: 'GET_VIPER_SCORES', payload: viperScores }),
      ).to.be.true;

      expect(
        store.dispatch.calledWithMatch({
          type: 'GET_OFFENDER_NOMIS_PROFILES',
          payload: offenderProfiles.output,
        }),
      ).to.be.true;
    });
  });
});

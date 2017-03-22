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
    completed: true,
  },
  {
    NOMS_Number: 'bar-id',
    Surname: 'foo-surname',
    First_Name: 'foo-first-name',
    Date_of_Birth: 'foo-age',
    completed: false,
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
          if (key === 'completed') return;
          expect(wrapper.text()).to.include(profile[key]);
        });
      });
    });

    it('displays a completed assessments', () => {
      const wrapper = mount(<Dashboard profiles={profiles} />);
      expect(wrapper.find('[data-status-complete=true]').length).to.equal(1);
      expect(wrapper.find('[data-status-complete=true]').text()).to.equal('Done');
    });

    it('responds to profile selection', () => {
      const callback = sinon.spy();
      const wrapper = shallow(<Dashboard profiles={profiles} onOffenderSelect={callback} />);

      const profileBtn = wrapper.find('[data-status-complete=false] > button');

      profileBtn.simulate('click');

      expect(callback.calledOnce).to.equal(true, 'callback called on click');
      expect(callback.calledWith(profiles[1])).to.equal(
        true,
        'callback called with the correct props',
      );
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
        assessmentStatus: {
          completed: ['foo-id'],
        },
        offender: {
          profiles: [
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
          ],
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
          if (key === 'completed') return;
          expect(wrapper.text()).to.include(profile[key]);
        });
      });
    });

    it('displays a completed assessments', () => {
      expect(wrapper.find('[data-status-complete=true]').length).to.equal(1);
      expect(wrapper.find('[data-status-complete=true]').text()).to.equal('Done');
    });

    it('responds to profile selection', () => {
      const profileBtn = wrapper.find('[data-status-complete=false] > button');

      profileBtn.simulate('click');

      expect(
        store.dispatch.calledWithMatch({ type: 'SELECT_OFFENDER', payload: profiles[1] }),
      ).to.equal(true, 'SELECT_OFFENDER dispatch');

      expect(
        store.dispatch.calledWithMatch({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/offender-profile'] },
        }),
      ).to.equal(true, 'dispatch /offender-profile');
    });

    it('calls actions when component mounts', () => {
      expect(
        store.dispatch.calledWithMatch({ type: 'GET_VIPER_SCORES', payload: viperScores }),
      ).to.equals(true, 'dispatch GET_VIPER_SCORES');

      expect(
        store.dispatch.calledWithMatch({
          type: 'GET_OFFENDER_NOMIS_PROFILES',
          payload: offenderProfiles.output,
        }),
      ).to.equals(false, 'dispatch GET_OFFENDER_NOMIS_PROFILES');
    });
  });
});

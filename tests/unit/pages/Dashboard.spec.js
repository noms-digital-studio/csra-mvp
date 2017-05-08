import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { fakeStore } from '../test-helpers';

import viperScores from '../../../src/javascript/fixtures/viper.json';

import ConnectedDashboard, {
  Dashboard,
} from '../../../src/javascript/pages/Dashboard';

const profiles = [
  {
    NOMS_Number: 'foo-id',
    Surname: 'foo-surname',
    First_Name: 'foo-first-name',
    Date_of_Birth: 'foo-age',
    assessmentCompleted: {
      nomisId: 'foo-id',
      recommendation: 'Single Cell',
      rating: 'High',
      reasons: ['foo-reason'],
    },
    healthAssessmentCompleted: {
      NOMS_Number: 'foo-id',
    },
  },
  {
    NOMS_Number: 'bar-id',
    Surname: 'foo-surname',
    First_Name: 'foo-first-name',
    Date_of_Birth: 'foo-age',
    assessmentCompleted: {},
    healthAssessmentCompleted: {},
  },
];

const assertGivenValuesInWhiteListAreInPage = (list, whiteList, page) => {
  list.forEach((item) => {
    const keys = Object.keys(item);
    keys.forEach((key) => {
      if (whiteList.includes(key)) {
        expect(page.text()).to.include(item[key]);
      }
    });
  });
};

describe('<Dashboard />', () => {
  context('Standalone Dashboard', () => {
    it('renders the correct number of profiles rows', () => {
      const wrapper = shallow(<Dashboard profiles={profiles} />);
      expect(wrapper.find('[data-profile-row]').length).to.equal(2);
    });

    it('renders the correct profile information per row', () => {
      const wrapper = shallow(<Dashboard profiles={profiles} />);
      const whitelist = [
        'NOMS_Number',
        'Surname',
        'First_Name',
        'Date_of_Birth',
      ];

      assertGivenValuesInWhiteListAreInPage(profiles, whitelist, wrapper);
    });

    it('displays a completed assessments', () => {
      const wrapper = mount(<Dashboard profiles={profiles} />);
      expect(wrapper.find('[data-assessment-complete=true]').length).to.equal(
        1,
      );
      expect(wrapper.find('[data-assessment-complete=true]').text()).to.equal(
        'Complete',
      );
    });

    it('displays a completed health assessments', () => {
      const wrapper = mount(<Dashboard profiles={profiles} />);
      expect(
        wrapper.find('[data-health-assessment-complete=true]').length,
      ).to.equal(1);
      expect(
        wrapper.find('[data-health-assessment-complete=true]').text(),
      ).to.equal('Complete');
    });

    it('displays the cell sharing assessment for a completed prisoner assessment', () => {
      const wrapper = mount(<Dashboard profiles={profiles} />);

      expect(wrapper.find('[data-cell-recommendation]').length).to.equal(1);
      expect(wrapper.find('[data-cell-recommendation]').text()).to.equal(
        'Single Cell',
      );
    });

    it('responds to the selection of an incomplete CSRA assessment', () => {
      const callback = sinon.spy();
      const wrapper = shallow(
        <Dashboard profiles={profiles} onOffenderSelect={callback} />,
      );

      const profileBtn = wrapper.find('[data-assessment-complete=false] > a');

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

      mount(<Dashboard getViperScores={getViperScores} />);

      expect(getViperScores.calledOnce).to.equal(true, 'getViperScores called');
    });
  });

  context('Connected Dashboard', () => {
    let wrapper;
    let store;

    beforeEach(() => {
      store = fakeStore({
        assessmentStatus: {
          completed: [
            {
              nomisId: 'foo-id',
              recommendation: 'Single Cell',
              rating: 'High',
              reasons: ['foo-reason'],
            },
          ],
        },
        healthcareStatus: {
          completed: [
            {
              NOMS_Number: 'foo-id',
            },
          ],
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

    it('renders the correct number of profiles rows', () => {
      expect(wrapper.find('[data-profile-row]').length).to.equal(2);
    });

    it('renders the correct profile information per row', () => {
      const whitelist = [
        'NOMS_Number',
        'Surname',
        'First_Name',
        'Date_of_Birth',
      ];

      assertGivenValuesInWhiteListAreInPage(profiles, whitelist, wrapper);
    });

    it('displays a completed assessments', () => {
      expect(wrapper.find('[data-assessment-complete=true]').length).to.equal(1);
      expect(wrapper.find('[data-assessment-complete=true]').text()).to.equal('Complete');
    });

    it('displays a completed health assessments', () => {
      expect(
        wrapper.find('[data-health-assessment-complete=true]').length,
      ).to.equal(1);
      expect(
        wrapper.find('[data-health-assessment-complete=true]').text(),
      ).to.equal('Complete');
    });

    it('displays the cell sharing assessment for a completed prisoner assessment', () => {
      expect(wrapper.find('[data-cell-recommendation]').length).to.equal(1);
      expect(wrapper.find('[data-cell-recommendation]').text()).to.equal('Single Cell');
    });

    it('responds to the selection of an incomplete CSRA assessment', () => {
      const profileBtn = wrapper.find('[data-assessment-complete=false] > a');

      profileBtn.simulate('click');

      expect(
        store.dispatch.calledWithMatch({
          type: 'SELECT_OFFENDER',
          payload: profiles[1],
        }),
      ).to.equal(true, 'SELECT_OFFENDER dispatch');

      expect(
        store.dispatch.calledWithMatch({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/offender-profile'] },
        }),
      ).to.equal(true, 'dispatch /offender-profile');
    });

    it('responds to the selection of an incomplete health assessment by displaying the first question', () => {
      const profileBtn = wrapper.find(
        '[data-health-assessment-complete=false] > a',
      );

      profileBtn.simulate('click');

      expect(
        store.dispatch.calledWithMatch({
          type: 'SELECT_OFFENDER',
          payload: profiles[1],
        }),
      ).to.equal(true, 'SELECT_OFFENDER dispatch');

      expect(
        store.dispatch.calledWithMatch({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/healthcare-assessment/outcome'] },
        }),
      ).to.equal(true, 'dispatch /healthcare-assessment/outcome');
    });

    it('calls actions when component mounts', () => {
      expect(
        store.dispatch.calledWithMatch({
          type: 'GET_VIPER_SCORES',
          payload: viperScores.output,
        }),
      ).to.equals(true, 'dispatch GET_VIPER_SCORES');
    });
  });
});

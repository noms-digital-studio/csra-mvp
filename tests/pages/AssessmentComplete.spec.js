import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { fakeStore } from '../test-helpers';

import ConnectedAssessmentComplete, {
  AssessmentComplete,
} from '../../src/javascript/pages/AssessmentComplete';

const prisonerDetails = {
  First_Name: 'foo-name',
  Surname: 'foo-surname',
  Date_of_Birth: 'foo-date',
  NOMS_Number: 'foo-nomis-id',
};

const questions = [
  {
    riskIndicator: 'foo-section',
    title: 'foo-title',
    description: 'foo-description',
    template: 'default_with_aside',
    aside: {
      template: 'static',
      title: 'aside-title',
      description: 'aside-description',
    },
    sharedCellPredicate: {
      type: 'QUESTION',
      value: 'no',
      dependents: ['foo-section'],
      reasons: ['foo-reason'],
    },
  },
];

describe('<AssessmentComplete />', () => {
  context('Standalone AssessmentComplete', () => {
    it('accepts and correctly renders a profile', () => {
      const wrapper = shallow(<AssessmentComplete prisoner={prisonerDetails} />);
      const pageText = wrapper.text();
      expect(pageText).to.contain('foo-name');
      expect(pageText).to.contain('foo-surname');
      expect(pageText).to.contain('foo-date');
      expect(pageText).to.contain('foo-nomis-id');
    });

    it('renders the outcome of the assessment', () => {
      const outcome = {
        recommendation: 'foo-recommendation',
        rating: 'foo-rating',
        reasons: ['foo-reason'],
      };
      const wrapper = shallow(<AssessmentComplete outcome={outcome} />);

      const pageText = wrapper.text();

      expect(pageText).to.contain('foo-recommendation');
      expect(pageText).to.contain('foo-rating');
      expect(pageText).to.contain('foo-reason');
    });

    it('handles callback on assessment submission', () => {
      const outcome = {
        recommendation: 'foo-recommendation',
        rating: 'foo-rating',
        reasons: ['foo-reason'],
      };

      const callback = sinon.spy();
      const wrapper = mount(
        <AssessmentComplete outcome={outcome} prisoner={prisonerDetails} onSubmit={callback} />,
      );
      wrapper.find('button').simulate('click');
      expect(callback.calledOnce).to.equal(true, 'callback called once');

      expect(callback.calledWith({ nomisId: 'foo-nomis-id', ...outcome })).to.equal(
        true,
        'called with the correct arguments',
      );
    });
  });

  context('Connected AssessmentComplete', () => {
    let store;

    beforeEach(() => {
      store = fakeStore({
        assessmentStatus: {
          exitPoint: 'foo-section',
        },
        questions: {
          questions,
        },
        offender: {
          selected: prisonerDetails,
        },
      });
    });

    it('accepts and correctly renders a profile', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedAssessmentComplete />
        </Provider>,
      );
      const pageText = wrapper.text();
      expect(pageText).to.contain('foo-name');
      expect(pageText).to.contain('foo-surname');
      expect(pageText).to.contain('foo-date');
      expect(pageText).to.contain('foo-nomis-id');
    });

    it('renders the outcome of a high risk the assessment', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedAssessmentComplete />
        </Provider>,
      );
      const pageText = wrapper.text();
      expect(pageText).to.contain('High');
      expect(pageText).to.contain('Single Cell');
      expect(pageText).to.contain('foo-reason');
    });

    it('renders the outcome of a low risk assessment', () => {
      const lowRiskStore = fakeStore({
        assessmentStatus: {
          exitPoint: '',
        },
        questions: {
          questions,
        },
        offender: {
          selected: prisonerDetails,
        },
      });
      const wrapper = mount(
        <Provider store={lowRiskStore}>
          <ConnectedAssessmentComplete />
        </Provider>,
      );
      const pageText = wrapper.text();
      expect(pageText).to.contain('Low');
      expect(pageText).to.contain('Shared Cell');
      expect(pageText).to.contain(
        'Based on the assessment the prisoner presents a low risk of violence and is unlikely to pose a risk against a cell mate',
      );
    });

    it('handles callback on assessment submission', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedAssessmentComplete />
        </Provider>,
      );
      wrapper.find('button').simulate('click');

      expect(
        store.dispatch.calledWithMatch({
          type: 'COMPLETE_ASSESSMENT',
          payload: {
            nomisId: 'foo-nomis-id',
            recommendation: 'Single Cell',
            rating: 'High',
            reasons: ['foo-reason'],
          },
        }),
      ).to.equal(true, 'dispatched COMPLETE_ASSESSMENT');

      expect(
        store.dispatch.calledWithMatch({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['assessment-confirmation'] },
        }),
      ).to.equal(true, 'Changed path to /assessment-confirmation');
    });
  });
});

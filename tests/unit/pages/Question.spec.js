import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { fakeStore } from '../test-helpers';

import ConnectedQuestion, { Question } from '../../../src/javascript/pages/Question';

const prisoner = {
  'nomis-id': 'bar-id',
  surname: 'foo-surname',
  firstName: 'foo-first-name',
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
  },
  {
    riskIndicator: 'bar-section',
    title: 'bar-title',
    description: 'bar-description',
    template: 'default_with_aside',
    aside: {
      template: 'static',
      title: 'aside-title',
      description: 'aside-description',
    },
    sharedCellPredicate: {
      type: 'QUESTION',
      value: 'no',
      dependents: ['bar-section'],
    },
  },
];

describe('<Question />', () => {
  context('Standalone Question', () => {
    it('calls actions when component mounts', () => {
      const getQuestions = sinon.spy();

      mount(<Question getQuestions={getQuestions} />);

      expect(getQuestions.calledOnce).to.be.true;
    });

    it('renders offender details', () => {
      const wrapper = mount(<Question prisoner={prisoner} />);

      expect(wrapper.text()).to.contain('foo-surname');
      expect(wrapper.text()).to.contain('foo-first-name');
    });

    it('displays sections based on the params', () => {
      const params = { section: 'foo-section' };

      const wrapper = mount(<Question questions={questions} params={params} />);

      expect(wrapper.find('[data-section-holder="Section 1 of 2"]').length).to.equal(1);
    });

    it('calls the onSubmit action with the answer and riskIndicator', () => {
      const callback = sinon.spy();

      const params = { section: 'foo-section' };

      const wrapper = mount(<Question questions={questions} params={params} onSubmit={callback} />);

      wrapper.find('#radio-yes').simulate('change', { target: { value: 'yes' } });

      wrapper.find('form').simulate('submit');

      expect(callback.calledOnce).to.equal(true, 'onSubmit called');
      expect(
        callback.calledWith({
          riskIndicator: 'foo-section',
          answer: { answer: 'yes' },
          nextPath: '/assessment/bar-section',
          canContinue: true,
        }),
      ).to.equal(true, 'called with the correct props');
    });
  });

  context('Connected Question', () => {
    let store;

    beforeEach(() => {
      store = fakeStore({
        answers: {
          selectedPrisonerId: 'foo-prisoner-id',
          answers: {},
        },
        questions: {
          questions,
        },
        offender: {
          selected: {
            First_Name: 'foo-first-name',
            Surname: 'foo-surname',
            Date_of_Birth: '17-Nov-1999',
            NOMS_Number: 'AA54321XX',
          },
        },
      });
    });

    it('calls actions when component mounts', () => {
      mount(
        <Provider store={store}>
          <ConnectedQuestion params={{ section: 'foo-section' }} />
        </Provider>,
      );

      expect(store.dispatch.calledWithMatch({ type: 'GET_QUESTIONS' })).to.equal(
        true,
        'dispatch GET_QUESTIONS',
      );
    });

    it('renders offender details', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedQuestion params={{ section: 'foo-section' }} />
        </Provider>,
      );

      expect(wrapper.text()).to.contain('foo-surname');
      expect(wrapper.text()).to.contain('foo-first-name');
    });

    it('calls the onSubmit action with the answer and riskIndicator', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedQuestion params={{ section: 'foo-section' }} />
        </Provider>,
      );

      wrapper.find('#radio-yes').simulate('change', { target: { value: 'yes' } });
      wrapper.find('form').simulate('submit');

      expect(
        store.dispatch.calledWithMatch({
          type: 'SAVE_ANSWER',
          payload: { 'foo-section': { answer: 'yes' } },
        }),
      ).to.equal(true, 'Dispatched SAVE_ANSWER');

      expect(
        store.dispatch.calledWithMatch({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/assessment/bar-section'] },
        }),
      ).to.equal(true, 'Changed path to /assessment/bar-section');
    });

    it('call the saveExit point action if question fails the decision engine', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedQuestion params={{ section: 'bar-section' }} />
        </Provider>,
      );

      wrapper.find('#radio-yes').simulate('change', { target: { value: 'yes' } });
      wrapper.find('form').simulate('submit');

      expect(
        store.dispatch.calledWithMatch({
          type: 'SAVE_EXIT_POINT',
          payload: 'bar-section',
        }),
      ).to.equal(true, 'Dispatched SAVE_EXIT_POINT');
    });
  });
});

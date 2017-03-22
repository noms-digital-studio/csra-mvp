import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { fakeStore } from '../test-helpers';

import ConnectedAssessmentComplete, {
  AssessmentComplete,
} from '../../src/javascript/pages/AssessmentComplete';

const selected = {
  First_Name: 'foo-name',
  Surname: 'foo-surname',
  Date_of_Birth: 'foo-date',
  NOMS_Number: 'foo-nomis-id',
};

describe('<AssessmentComplete />', () => {
  context('Standalone AssessmentComplete', () => {
    it('accepts and correctly renders a profile', () => {
      const wrapper = shallow(<AssessmentComplete details={selected} />);
      const pageText = wrapper.find('[data-offender-profile-details]').first().text();
      expect(pageText).to.contain('foo-name');
      expect(pageText).to.contain('foo-surname');
      expect(pageText).to.contain('foo-date');
      expect(pageText).to.contain('foo-nomis-id');
    });

    it('handles callback on assessment submission', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AssessmentComplete details={selected} onSubmit={callback} />);
      wrapper.find('button').simulate('click');
      expect(callback.calledOnce).to.equal(true, 'callback called once');
      expect(callback.calledWith('foo-nomis-id')).to.equal(
        true,
        'called with the correct arguments',
      );
    });
  });

  context('Connected AssessmentComplete', () => {
    let wrapper;
    let store;

    beforeEach(() => {
      store = fakeStore({
        offender: {
          selected,
        },
      });

      wrapper = mount(
        <Provider store={store}>
          <ConnectedAssessmentComplete />
        </Provider>,
      );
    });

    it('accepts and correctly renders a profile', () => {
      const pageText = wrapper.find('[data-offender-profile-details]').first().text();
      expect(pageText).to.contain('foo-name');
      expect(pageText).to.contain('foo-surname');
      expect(pageText).to.contain('foo-date');
      expect(pageText).to.contain('foo-nomis-id');
    });

    it('handles callback on assessment submission', () => {
      wrapper.find('button').simulate('click');
      expect(
        store.dispatch.calledWithMatch({ type: 'COMPLETE_ASSESSMENT', payload: 'foo-nomis-id' }),
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

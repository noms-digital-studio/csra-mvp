import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { fakeStore } from '../test-helpers';

import ConnectedAssessmentConfirmation, {
  AssessmentConfirmation,
} from '../../src/javascript/pages/AssessmentConfirmation';

const prisonerDetails = {
  First_Name: 'foo-name',
  Surname: 'foo-surname',
  Date_of_Birth: 'foo-date',
  NOMS_Number: 'foo-nomis-id',
};

describe('<AssessmentConfirmation />', () => {
  context('Standalone AssessmentConfirmation', () => {
    it('accepts and correctly renders a profile', () => {
      const wrapper = shallow(<AssessmentConfirmation prisoner={prisonerDetails} />);
      const pageText = wrapper.text();
      expect(pageText).to.contain('foo-name');
      expect(pageText).to.contain('foo-surname');
      expect(pageText).to.contain('foo-date');
      expect(pageText).to.contain('foo-nomis-id');
    });

    it('renders the assessment cell sharing outcome', () => {
      const wrapper = shallow(
        <AssessmentConfirmation
          outcome={{ recommendation: 'foo-recommendation', rating: 'foo-rating' }}
        />,
      );
      const pageText = wrapper.text();
      expect(pageText).to.contain('foo-recommendation');
      expect(pageText).to.contain('foo-rating');
    });
  });

  context('Connected AssessmentConfirmation', () => {
    let store;

    beforeEach(() => {
      store = fakeStore({
        assessmentStatus: {
          completed: [
            {
              nomisId: 'foo-nomis-id',
              recommendation: 'Single Cell',
              rating: 'High',
              reasons: ['foo-reason'],
            },
          ],
        },
        offender: {
          selected: prisonerDetails,
        },
      });
    });

    it('accepts and correctly renders a profile', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedAssessmentConfirmation />
        </Provider>,
      );
      const pageText = wrapper.text();
      expect(pageText).to.contain('foo-name');
      expect(pageText).to.contain('foo-surname');
      expect(pageText).to.contain('foo-date');
      expect(pageText).to.contain('foo-nomis-id');
      expect(pageText).to.contain('High');
      expect(pageText).to.contain('Single Cell');
    });
  });
});

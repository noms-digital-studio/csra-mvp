import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { fakeStore } from '../test-helpers';

import ConnectedSignIn, { SignIn } from '../../src/javascript/pages/SignIn';

describe('<SignIn />', () => {
  context('Standalone Sign', () => {
    it('fails to sign in if empty form is submitted', () => {
      const callback = sinon.spy();
      const wrapper = mount(<SignIn onSubmit={callback} />);

      wrapper.find('form').simulate('submit');

      expect(callback.calledOnce).to.be.false;
    });

    it('submits the form is correctly completed', () => {
      const callback = sinon.spy();
      const wrapper = mount(<SignIn onSubmit={callback} />);
      const form = wrapper.find('form');
      const name = 'Foo Bar';

      form.find('[name="username"]').node.value = name;

      form.simulate('submit');

      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith(name)).to.be.true;
    });
  });

  context('Connected Sign In', () => {
    let wrapper;
    let store;

    beforeEach(() => {
      store = fakeStore({});

      wrapper = mount(
        <Provider store={store}>
          <ConnectedSignIn />
        </Provider>,
      );
    });

    it('submits the form is correctly completed', () => {
      const form = wrapper.find('form');
      const name = 'Foo Bar';

      form.find('[name="username"]').node.value = name;

      form.simulate('submit');

      expect(store.dispatch.calledWithMatch({ type: 'SIGN_IN', payload: name })).to.be.true;

      expect(
        store.dispatch.calledWithMatch({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'replace', args: ['/dashboard'] },
        }),
      ).to.be.true;
    });
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ConnectedHeader, { Header } from '../../src/javascript/components/Header';
import { fakeStore } from '../test-helpers';

describe('<Header />', () => {
  context('Standalone Header', () => {
    it('renders a username if loggedIn', () => {
      const wrapper = mount(<Header isLoggedIn username="Foo Bar" />);

      expect(wrapper.text()).to.contain('Foo Bar');
    });

    it('renders nothing if user is not loggedIn', () => {
      const wrapper = mount(<Header username="Foo Bar" />);

      expect(wrapper.text()).to.not.contain('Foo Bar');
    });
  });

  context('Connected Header', () => {
    let wrapper;
    let store;

    beforeEach(() => {
      store = fakeStore({
        login: {
          loggedIn: true,
          currentUser: {
            name: 'Foo Bar',
          },
        },
      });

      wrapper = mount(
        <Provider store={store}>
          <ConnectedHeader />
        </Provider>,
      );
    });

    it('render a username from the store', () => {
      expect(wrapper.text()).to.contain('Foo Bar');
    });
  });
});

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from '../state/RootReducer';

import LoginScreen from '../components/screens/LoginScreen';

const Global: any = global;
let store = createStore(RootReducer);
let container: HTMLDivElement;
const flushPromises = () => new Promise(setImmediate);

// fake response from mocked backend
const fakeResponse = [{
  userId: 'userId',
  netId: 'jd',
  firstName: 'John',
  lastName: 'Doe'
}]

// mocking the implementation of all fetch calls to use the fake response
jest.spyOn(Global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeResponse)
  })
);

// mocking the OverlapViewScheduleGrid component for simplification of testing
jest.mock('../components/schedular/OverlapViewScheduleGrid', () => {
  return function FakeOverlapViewScheduleGrid(props: {
    userIdArray: string[]
  }) {
    return (
      <div id='text'>
        Schedule grid is visible
      </div>
    );
  }
});

describe('LoginScreen', () => {

  // to be run before each test
  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  // to be run after each test
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  // test if component renders with schedule key section initially closed
  it('renders with schedule key section initially closed', async () => {
    // render component to be tested
    act(() => {
      render(
        <Provider store={store}>
          <LoginScreen />
        </Provider>,
        container
      )
    });
    // check if text content from closed schedule key section is present
    expect(container.textContent).toContain('Have a schedule key?');
  });

  // test if component renders with schedule key section expanded after clicking expand button
  it('renders with schedule key section expanded after clicking expand button', async () => {
    // render component to be tested
    await act(async () => {
      render(
        <Provider store={store}>
          <LoginScreen />
        </Provider>,
        container
      )
    });
    // mock button press event
    const button = document.querySelector("[id='schedule_key_section_expand']");
    act(() => {
      if (button)
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    // check if text content from expanded schedule key section is present
    expect(container.textContent).toContain('Schedule Key');
    expect(container.textContent).toContain('Enter');
  });

  // test if component renders schedule grid after entering schedule key
  it('renders schedule grid after entering schedule key', async () => {
    // render component to be tested
    await act(async () => {
      render(
        <Provider store={store}>
          <LoginScreen />
        </Provider>,
        container
      )
    });
    // mock button press event to expand schedule key section
    const button0 = document.querySelector("[id='schedule_key_section_expand']");
    act(() => {
      if (button0)
        button0.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    // mock button press event to expand schedule key section
    const button1 = document.querySelector("[id='schedule_key_submit']");
    act(() => {
      if (button1)
        button1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await flushPromises();
    // check if text content from schedule grid is present
    expect(container.textContent).toContain('Schedule grid is visible');
    expect(container.textContent).toContain('jd@iastate.edu');
    expect(container.textContent).toContain('John Doe');
  });

});

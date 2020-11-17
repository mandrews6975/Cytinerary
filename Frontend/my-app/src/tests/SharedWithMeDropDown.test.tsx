import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import SharedWithMeDropDown from '../components/dropdowns/SharedWithMeDropDown'

const Global: any = global;
let container: HTMLDivElement;

//This variable will be used to keep track of the selected userId array the component outputs
let userIdArrayPropsOutput : string[] = [];

// fake response from mocked backend
const fakeResponse = [
  [
    'user1ID', //userId
    'user1', // netId
    'one', // lastname
    'user' // firstname
  ],
  [
    'user2ID', // userId
    'user2', // netId
    'two', // lastname
    'user' // firstname
  ],
  [
    'user3ID', // userId
    'user3', // netId
    'three', // lastname
    'user' // firstname
  ]
]

// mocking the implementation of all fetch calls to use the fake response
jest.spyOn(Global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeResponse)
  })
);

describe('SharedWithMeDropDown', () => {
  // to be run before each test
  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      render(
          <SharedWithMeDropDown userId = '111' onUpdate = {(idArray : string[]) => {userIdArrayPropsOutput = idArray}}/>, container
      )
    });
  });

  // to be run after each test
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('displays the users for which this user is shared with as options', async () => {
    //Verify that the formatted users strings are present in the component
    expect(container.textContent).toContain('user1: user one');
    expect(container.textContent).toContain('user2: user two');
    expect(container.textContent).toContain('user3: user three');
  });

  it('does not execute onUpdate prop upon intially rendering', async () => {
    // Verify that the userId Array is unchanged when the component renders
    expect(userIdArrayPropsOutput).toEqual([])
  });

  it('triggers onUpdate prop when selecting an option', async () => {
    let option = document.querySelectorAll("[type='checkbox']");
    //Select an option
    act(() => {
      if (option[0])
        option[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    // Verify that the onUpdate prop executes with a new array
    expect(userIdArrayPropsOutput).toEqual(['user1ID'])

    //Select the two other options
    act(() => {
        option[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        option[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    //Verify that all of the selected userIds are present in the array returned by the onUpdate prop
    expect(userIdArrayPropsOutput).toEqual(['user1ID',"user2ID","user3ID"])
  });

  // test if component renders schedule grid after entering schedule key
  it('triggers onUpdate prop when removing an option', async () => {
    let option = document.querySelector("[type='checkbox']");
    //Select an option
    act(() => {
      if (option)
        option.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    // Verify that the onUpdate prop executes with a new array
    expect(userIdArrayPropsOutput).toEqual(['user1ID'])

    // Click the option again to deselect it
    act(() => {
      if (option)
        option.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // Verify that the updated array contains no userIds
    expect(userIdArrayPropsOutput).toEqual([])
  });
});

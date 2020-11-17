import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom/extend-expect'
import { act } from "react-dom/test-utils";
import OverlapViewScheduleGrid from "../components/schedular/OverlapViewScheduleGrid";
import OverlapEventDialogWindow from '../components/dialog_windows/OverlapEventDialogWindow';
import ViewParticipantEventDialogWindow from '../components/dialog_windows/ViewParticipantEventDialogWindow';

const globalAny: any = global;
let container: HTMLDivElement;

// This will mock the OverlapEventDialogWindow component (This will be used instead if any components import the OverlapEventDialogWindow)
jest.mock("../components/dialog_windows/OverlapEventDialogWindow", () => {
  return function DummyCreatorEventDialog(props) {
    return (
      <div style={{ visibility: props.visible ? 'visible' : 'hidden' }} data-testid="EventOverlapDialog">
        This is the mocked Overlap Event Dialog Window
      </div>
    );
  };
});

// This object will be returned in the mocked fetch request response
const fakeEvents = [{
  eventId: "123",
  name: "MockEventName",
  startMinute: "startMinute",
  startTime: "2020-10-25 08:00:00",
  endTime: "2020-10-25 09:30:00",
  age: "32",
  label: "Basketball"
}];

// Return the fakeEvents object when any fetch methods are executed
jest.spyOn(globalAny, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeEvents)
  })
);

describe("The OverlapViewScheduleGrid Component", () => {
  beforeEach(async () => {
    // Setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<OverlapViewScheduleGrid userIdArray={["111", "222", "333"]} />, container);
    });
  });

  afterEach(() => {
    // Cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
  });

  afterAll(() => {
    // Remove the mock to ensure tests are completely isolated
    globalAny.fetch.mockRestore();
  });

  it("displays events on mount", () => {
    // At least one event with the mocked object's name should be rendered
    expect(container.textContent).toContain(fakeEvents[0].name);
  });

  it("Events are rendered for each user", () => {
    // Since the fetch calls are mocked, there should be three creator events, one for each user
    const CreatorTimeBlock = document.querySelectorAll("#CreatorEvent");
    //
    expect(CreatorTimeBlock.length).toEqual(3);
  });

  it("displays View/Update Creator Event Dialog Modal onClick of any timeblock", () => {
    const CreatorTimeBlock = document.querySelector("#CreatorEvent");
    const CreatorDialogBlock = container.querySelector('[data-testid="EventOverlapDialog"]');

    // Check to see if the mocked creator component is present in the DOM
    expect(container.textContent).toContain("This is the mocked Overlap Event Dialog Window");

    // Verify that the mocked dialog component is not visibile yet
    expect(CreatorDialogBlock)!.not.toBeVisible();

    // Click on the creator timeblock
    act(() => {
      CreatorTimeBlock!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Verify that the mocked dialog component is visible after the click
    expect(CreatorDialogBlock).toBeVisible();
  });
});

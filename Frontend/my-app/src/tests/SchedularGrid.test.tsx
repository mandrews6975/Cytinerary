import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom/extend-expect'
import { act } from "react-dom/test-utils";
import ScheduleGrid from "../components/schedular/ScheduleGrid";
import EditEventDialogWindow from '../components/dialog_windows/EditEventDialogWindow';
import ViewParticipantEventDialogWindow from '../components/dialog_windows/ViewParticipantEventDialogWindow';


jest.mock("../components/dialog_windows/EditEventDialogWindow", () => {
  return function DummyCreatorEventDialog(props) {
    return (
      <div style = {{visibility: props.visible ? 'visible' : 'hidden'}} data-testid="creatorDialog">
        This is the mocked creator event dialog
      </div>
    );
  };
});

jest.mock("../components/dialog_windows/ViewParticipantEventDialogWindow", () => {
  return function DummyParticipantEventDialog(props) {
    return (
      <div style = {{visibility: props.visible ? 'visible' : 'hidden'}} data-testid="participantDialog">
        This is the mocked participant event dialog
      </div>
    );
  };
});

const globalAny:any = global;
let container : HTMLDivElement;

const fakeEvents = [{
  eventId: "123",
  name: "MockEventName",
  startMinute: "startMinute",
  startTime: "2020-10-25 08:00:00",
  endTime: "2020-10-25 09:30:00",
  age: "32",
  label: "Basketball"
}];

describe("The SchedularGrid Component", () => {
  beforeEach(async () => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    jest.spyOn(globalAny, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeEvents)
      })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<ScheduleGrid user="111" />, container);
    });
  });

  afterEach(() => {
    // remove the mock to ensure tests are completely isolated
    globalAny.fetch.mockRestore();
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
  });

  it("displays creator events on mount", async () => {
    expect(container.textContent).toContain(fakeEvents[0].name);
  });

  it("displays View/Update Creator Event Dialog Modal onClick of creator timeblock", () => {

    const CreatorTimeBlock = document.querySelector("#CreatorEvent");
    const CreatorDialogBlock = container.querySelector('[data-testid="creatorDialog"]');
    //Check to see if the mocked creator component is present in the DOM
    expect(container.textContent).toContain("This is the mocked creator event dialog");
    expect(CreatorDialogBlock)!.not.toBeVisible();
    //Click on the creator timeblock
    act(() => {
      CreatorTimeBlock!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    //Verify that the mocked component is visible after the click
    expect(CreatorDialogBlock)!.not.toBeVisible();

  });

  it("displays the View Participant Event Dialog Modal onClick of participant timeblock", () => {
    const ParticipantTimeBlock = document.querySelector("#ParticipantEvent");
    const ParticipantDialogBlock = container.querySelector('[data-testid="participantDialog"]');
    //Check to see if the mocked component is present in the DOM
    expect(container.textContent).toContain("This is the mocked participant event dialog");
    //Verify that the mocked component is not visible
    expect(ParticipantDialogBlock)!.not.toBeVisible();
    //Click on the timeblock
    act(() => {
      ParticipantTimeBlock!.dispatchEvent(new MouseEvent("click", { bubbles: false }));
    });
    //Verify that the mocked component is visible after the click
    expect(ParticipantDialogBlock)!.not.toBeVisible();


  });
})

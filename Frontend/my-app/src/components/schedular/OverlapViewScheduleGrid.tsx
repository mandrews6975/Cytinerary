import * as React from 'react'
import { v4 as uuidv4 } from 'uuid';
import TimeBlock from './TimeBlock'
import '../../stylesheets/SchedularGrid.css'
import {
  IconButton
} from '@material-ui/core';
import {
  ArrowForward,
  ArrowBack
} from '@material-ui/icons';
import OverlapEventDialogWindow from '../dialog_windows/OverlapEventDialogWindow';



/**
 * This is interface used to define the props for this OverlapViewSchedularGrid component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface OverlapViewSchedularGridProps {
  //onSubmit: string,
  // visible: boolean,
  // onClose: () => void,
  /**
   * This is the userId of the logged in user
   */
  userIdArray: string[],
}


/**
 * This is the interface used to define the state variables for this OverlapViewSchedularGridComponent
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface OverlapViewSchedularGridState {
  /**
   * This state variable is an array containing objects specific to the events this user created
   */
  creatorEvents: { userId: string, eventId: string, name: string, startMinute: number, minutes: number, dateIndex: number, startTime: Date, endTime: Date }[],

  /**
   * This state variable is an array containing objects specific to the events this user is a participant of
   */
  participantEvents: { userId: string, eventId: string, name: string, startMinute: number, minutes: number, dateIndex: number, startTime: Date, endTime: Date }[],
  /**
   * This state variable is a day in the week the schedular is on
   */
  selectedDate: Date,
  /**
   * This state variable is a string containing the first day of the week that is calendar is currently on
   */
  startDate: string,
  /**
   * This state variable is a string containing the last day of the week that is calendar is currently on
   */
  endDate: string,
  /**
   * This is the state variable used to toggle the visibility status of the creator events EditEventDialogWindow
   */
  showOverlapEventDialogWindow: boolean,
  /**
   * This is the state variable that contains the eventId of the timeblock that was last clicked on
   */
  selectedEvent: string,
}


/**
 * This is the schedular grid component that is displayed in the ScheduleOverlapScreen. It displays the events for a given array of userIds.
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
class OverlapViewScheduleGrid extends React.Component<OverlapViewSchedularGridProps, OverlapViewSchedularGridState> {
  constructor(props: OverlapViewSchedularGridProps) {
    super(props);
    this.state = {
      creatorEvents: [],
      participantEvents: [],
      selectedDate: new Date(),
      startDate: '',
      endDate: '',
      showOverlapEventDialogWindow: false,
      selectedEvent: '',
    }
  }

  //This will execute when the component is first initialized
  componentDidMount() {
    this.getWeeklyEvents();
    let curr = new Date(this.state.selectedDate);
    curr.setHours(0, 0, 0, 0);
    this.setState({ selectedDate: new Date(curr.getTime()) })
  }

  componentDidUpdate(prevProps) {
    // Check to see if the userId array  prop was updated
    if (this.props.userIdArray.length !== prevProps.userIdArray.length) {
        this.getWeeklyEvents();
    }
  }

  /**
   * getWeeklyCreatorEvents - Given a startDate and endDate, this method sends a request to retrieve all creatorEvents from the backend
   *
   * @param  startDate: string This is dateTime string containing the date of Monday of the current week
   * @param  endDate: string This is dateTime string containing the date of Monday of the next week
   * @param  callback?: Function This is the optional callback function that is executed only when this method has been called
   */
  getWeeklyCreatorEvents(startDate: string, endDate: string, callback?: Function) {
    let creatorEvents: { userId: string, eventId: string, name: string, startMinute: number, minutes: number, dateIndex: number, startTime: Date, endTime: Date }[] = [];
    this.props.userIdArray.forEach((userId) => {
      try {
        fetch('/getCreatorEvents', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            creator: userId,
            startDate: startDate,
            endDate: endDate,
          }),
        }).then((response) => response.json())
          .then((json) => {

            json.forEach((event) => {
              var splitStartTime = event.startTime.replace("T", ":").split(/[- :]/);
              var splitEndTime = event.endTime.replace("T", ":").split(/[- :]/);
              var startTime = new Date(Date.UTC(splitStartTime[0], splitStartTime[1] - 1, splitStartTime[2], splitStartTime[3], splitStartTime[4]));
              var endTime = new Date(Date.UTC(splitEndTime[0], splitEndTime[1] - 1, splitEndTime[2], splitEndTime[3], splitEndTime[4]));
              //console.log(startTime.toString());
              //console.log(endTime.toString());
              // Apply each element to the Date function
              var dateIndex = (startTime.getDay() === 0 ? 6 : startTime.getDay() - 1);
              var startMinute = (startTime.getHours() * 60) + (startTime.getMinutes());
              //console.log(dateIndex);
              var minutes = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);
              let eventObject = {
                userId: userId,
                eventId: event.eventId,
                name: event.name,
                startMinute: startMinute,
                dateIndex: dateIndex,
                minutes: minutes,
                startTime: startTime,
                endTime: endTime,
              }
              creatorEvents.push(eventObject);
            })

          }).then(() => {
            if (callback) {
              callback();
            }
          });
      } catch (err) {
        console.log(err);
      }
    });
    this.setState({ creatorEvents });
  }

  /**
   * getWeeklyParticipantEvents - Given a startDate and endDate, this method sends a request to retrieve all participant events from the backend
   *
   * @param  startDate: string This is dateTime string containing the date of Monday of the current week
   * @param  endDate: string This is dateTime string containing the date of Monday of the next week
   */
  getWeeklyParticipantEvents(startDate: string, endDate: string) {
    let participantEvents: { userId: string, eventId: string, name: string, startMinute: number, minutes: number, dateIndex: number, startTime: Date, endTime: Date }[] = [];
    this.props.userIdArray.forEach((userId) => {
      try {
        fetch('/getParticipantEvents', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            participant: userId,
            startDate: startDate,
            endDate: endDate,
          }),
        }).then((response) => response.json())
          .then((json) => {

            json.forEach((event) => {
              var splitStartTime = event.startTime.replace("T", ":").split(/[- :]/);
              var splitEndTime = event.endTime.replace("T", ":").split(/[- :]/);
              var startTime = new Date(Date.UTC(splitStartTime[0], splitStartTime[1] - 1, splitStartTime[2], splitStartTime[3], splitStartTime[4]));
              var endTime = new Date(Date.UTC(splitEndTime[0], splitEndTime[1] - 1, splitEndTime[2], splitEndTime[3], splitEndTime[4]));
              //console.log(startTime.toString());
              //console.log(endTime.toString());
              // Apply each element to the Date function
              var dateIndex = (startTime.getDay() === 0 ? 6 : startTime.getDay() - 1);
              var startMinute = (startTime.getHours() * 60) + (startTime.getMinutes());
              //console.log(dateIndex);
              var minutes = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);
              let eventObject = {
                userId: userId,
                eventId: event.eventId,
                name: event.name,
                startMinute: startMinute,
                dateIndex: dateIndex,
                minutes: minutes,
                startTime: startTime,
                endTime: endTime,
              }
              participantEvents.push(eventObject);
            })
            this.setState({ participantEvents });
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  /**
   * getWeeklyEvents - This method determines that start and end date of the current week and stores all of the user's creator and participant events in the respective state variables
   *
   * @param callback?: Function This is the optional callback function that is executed only when this method has been called
   */
  getWeeklyEvents(callback?: Function) {
    let curr = new Date(this.state.selectedDate);
    curr.setHours(0, 0, 0, 0);
    var first = curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1); // First day is the day of the month - the day of the week
    var last = first + 7; // last day is the first day + 6
    //These are the first and last days of the current week, starting at monday ending the next monday.

    var startDate = new Date(curr.setDate(first)).toISOString().split('T')[0];
    var endDate = new Date(curr.setDate(last)).toISOString().split('T')[0];
    this.setState({ startDate, endDate })
    // console.log(firstday);
    // console.log(lastday);
    if(this.props.userIdArray.length !== 0) {
      this.getWeeklyCreatorEvents(startDate, endDate, callback);
      this.getWeeklyParticipantEvents(startDate, endDate);
    }
    else {
      this.setState({
        participantEvents: [],
        creatorEvents: []
      });
    }
  }

  /**
   * setNextWeek - This method increments the current week of this component
   */
  setNextWeek() {
    let nextDate = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), this.state.selectedDate.getDate() + 7);
    nextDate.setHours(0, 0, 0, 0);
    this.setState({
      selectedDate: new Date(nextDate),
    }, () => { this.getWeeklyEvents(); });
  }

  /**
   * setPreviousWeek - This method deincrements the current week of this component
   */
  setPreviousWeek() {
    let previousDate = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), this.state.selectedDate.getDate() - 7);
    previousDate.setHours(0, 0, 0, 0);
    this.setState({
      selectedDate: new Date(previousDate),
    }, () => { this.getWeeklyEvents(); });
  }

  /**
   * This method returns the local time timestamp string given a Date object
   * @param date This is the date for which the localTimeStampString will be generated with
   * @return Returns a timestamp string adjusted for the local timezone
   */
  getLocalTimeStampString(date: Date): string {
    var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T', ' ');
    return isoDateTime;
  }

  /**
   * render - This method returns the jsx content for this OverlapViewSchedularGrid component
   *
   * @return Returns the jsx content for this OverlapViewSchedularGrid component
   */
  render() {
    let referenceDate = new Date(this.state.startDate);
    let monday = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate() + 1);
    let tuesday = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate() + 2);
    let wednesday = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate() + 3);
    let thursday = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate() + 4);
    let friday = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate() + 5);
    let saturday = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate() + 6);
    let sunday = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate() + 7);

    const times: String[] = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1', minHeight: '400px', maxHeight: '400px', minWidth: '600px', marginTop: '10 px', borderColor: 'red', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'white' }} >
        <OverlapEventDialogWindow visible = {this.state.showOverlapEventDialogWindow} eventId = {this.state.selectedEvent} onClose={() => {this.setState({showOverlapEventDialogWindow:false})}} />
        <div style={{ display: 'flex', marginRight: "20px", borderBottom: 'solid', borderColor: 'black', flexDirection: 'row', }}>
          <div style={{ flex: '1' }}>
            <IconButton
              edge='end'
              onClick={() => { this.setPreviousWeek(); }}
            >
              <ArrowBack style={{ color: 'black' }} />
            </IconButton>

            <IconButton
              edge='end'
              onClick={() => { this.setNextWeek() }}
            >
              <ArrowForward style={{ color: 'black' }} />
            </IconButton>
          </div>
          <div className='HeaderCell'>
            <p style={{ marginTop: '-2px', marginBottom: '1px' }}>Monday</p>
            <p style={{ marginTop: '3px', marginBottom: '-10px' }}>{monday.toLocaleDateString()}</p>
          </div>
          <div className='HeaderCell'>
            <p style={{ marginTop: '-2px', marginBottom: '1px' }}>Tueday</p>
            <p style={{ marginTop: '3px', marginBottom: '-10px' }}>{tuesday.toLocaleDateString()}</p>
          </div>
          <div className='HeaderCell'>
            <p style={{ marginTop: '-2px', marginBottom: '1px' }}>Wednesday</p>
            <p style={{ marginTop: '3px', marginBottom: '-10px' }}>{wednesday.toLocaleDateString()}</p>
          </div>
          <div className='HeaderCell'>
            <p style={{ marginTop: '-2px', marginBottom: '1px' }}>Thursday</p>
            <p style={{ marginTop: '3px', marginBottom: '-10px' }}>{thursday.toLocaleDateString()}</p>
          </div>
          <div className='HeaderCell'>
            <p style={{ marginTop: '-2px', marginBottom: '1px' }}>Friday</p>
            <p style={{ marginTop: '3px', marginBottom: '-10px' }}>{friday.toLocaleDateString()}</p>
          </div>
          <div className='HeaderCell'>
            <p style={{ marginTop: '-2px', marginBottom: '1px' }}>Saturday</p>
            <p style={{ marginTop: '3px', marginBottom: '-10px' }}>{saturday.toLocaleDateString()}</p>
          </div>
          <div className='HeaderCell'>
            <p style={{ marginTop: '-2px', marginBottom: '1px' }}>Sunday</p>
            <p style={{ marginTop: '3px', marginBottom: '-10px' }}>{sunday.toLocaleDateString()}</p>
          </div>
        </div>
        <div style={{ display: 'flex', overflowY: 'scroll' }}>
          <div className='GridBody' style={{ display: 'flex', minHeight: '1440px', maxHeight: '1440px', maxWidth: '790px', flexDirection: 'row', flex: '5' }}>
            <div className={'TimeColumn'}>
              {
                times.map((time, index) => (
                  <div key={uuidv4()} className={'TimeCell'}>
                    {time}
                  </div>
                ))
              }

            </div>

            <div className={'BodyColumn'}>
              <div className={'BodyCell'}>
                {
                  this.state.creatorEvents.map((event, index) => (
                    <TimeBlock id = "CreatorEvent" name={event.name} draggable={false} onDragEnd={(e) => {}} onClick={() => {this.setState({selectedEvent: event.eventId, showOverlapEventDialogWindow:true})}} eventId={event.eventId} color={"dimGrey"} key={uuidv4()} height={event.minutes} xinit={97 * event.dateIndex} yinit={event.startMinute} />
                  ))
                }
                {
                  this.state.participantEvents.map((event, index) => (
                    <TimeBlock id = "ParticipantEvent" name={event.name} draggable={false} onDragEnd={(e) => {}} eventId={event.eventId} color={"dimGrey"} onClick={() => {this.setState({selectedEvent: event.eventId, showOverlapEventDialogWindow:true})}} key={uuidv4()} height={event.minutes} xinit={97 * event.dateIndex} yinit={event.startMinute} />
                  ))
                }
              </div>
              {
                times.map((time, index) => (
                  <div key={uuidv4()} className={'BodyCell'}>
                  </div>
                ))
              }
            </div>
            <div className={'BodyColumn'}>
              <div className={'BodyCell'}>

              </div>
              {
                times.map((time, index) => (
                  <div key={uuidv4()} className={'BodyCell'}>
                  </div>
                ))
              }
            </div>
            <div className={'BodyColumn'}>
              <div className={'BodyCell'}>

              </div>
              {
                times.map((time, index) => (
                  <div key={uuidv4()} className={'BodyCell'}>
                  </div>
                ))
              }
            </div>
            <div className={'BodyColumn'}>
              <div className={'BodyCell'}>

              </div>
              {
                times.map((time, index) => (
                  <div key={uuidv4()} className={'BodyCell'}>
                  </div>
                ))
              }
            </div>
            <div className={'BodyColumn'}>
              <div className={'BodyCell'}>

              </div>
              {
                times.map((time, index) => (
                  <div key={uuidv4()} className={'BodyCell'}>
                  </div>
                ))
              }
            </div>
            <div className={'BodyColumn'}>
              <div className={'BodyCell'}>

              </div>
              {
                times.map((time, index) => (
                  <div key={uuidv4()} className={'BodyCell'}>
                  </div>
                ))
              }
            </div>
            <div className={'BodyColumn'}>
              <div className={'BodyCell'}>

              </div>
              {
                times.map((time, index) => (
                  <div key={uuidv4()} className={'BodyCell'}>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OverlapViewScheduleGrid;

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

interface IProps {
  //onSubmit: string,
  // visible: boolean,
  // onClose: () => void,
  user: string,
}
interface IState {
  creatorEvents: {eventId: string, name: string, startMinute: number, minutes: number, dateIndex:number, startTime: Date, endTime: Date} [],
  selectedDate: Date,
  startDate: string,
  endDate: string
}

class ScheduleGrid extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
     creatorEvents: [],
     selectedDate: new Date(),
     startDate: '',
     endDate: ''
    }
  }

  componentDidMount() {
      //Include code for fetching the events based on the current week
      this.getWeeklyEvents();
      let curr = new Date(this.state.selectedDate);
      curr.setHours(0, 0, 0, 0);
      this.setState({selectedDate: new Date(curr.getTime())})

    }


    getWeeklyCreatorEvents(startDate: string, endDate: string) {
      try {
        fetch('/getCreatorEvents', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            creator: this.props.user,
            startDate: startDate,
            endDate: endDate,
          }),
        }).then((response) => response.json())
          .then((json) => {
            console.log("Sent Request")
            let creatorEvents: {eventId: string, name: string, startMinute: number, minutes: number, dateIndex: number, startTime: Date, endTime: Date} [] = [];
            json.forEach((event) => {
              var splitStartTime = event.startTime.replace("T", ":").split(/[- :]/);
              var splitEndTime = event.endTime.replace("T", ":").split(/[- :]/);
              var startTime = new Date(Date.UTC(splitStartTime[0], splitStartTime[1]-1, splitStartTime[2], splitStartTime[3], splitStartTime[4]));
              var endTime = new Date(Date.UTC(splitEndTime[0], splitEndTime[1]-1, splitEndTime[2], splitEndTime[3], splitEndTime[4]));
              //console.log(startTime.toString());
              //console.log(endTime.toString());
        // Apply each element to the Date function
              var dateIndex = (startTime.getDay() === 0 ? 6:startTime.getDay() - 1);
              var startMinute = (startTime.getHours() * 60) + (startTime.getMinutes());
              //console.log(dateIndex);
              var minutes = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);
              let eventObject = {
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
            this.setState({creatorEvents});
            console.log(this.state.creatorEvents.toString())
          });
      } catch (err) {
        console.log(err);
      }
  }

  getWeeklyParticipantEvents() {

  }

  getWeeklyEvents() {
    let curr = new Date(this.state.selectedDate);
    curr.setHours(0, 0, 0, 0);
    var first = curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6:1); // First day is the day of the month - the day of the week
    var last = first + 7; // last day is the first day + 6
    //These are the first and last days of the current week, starting at monday ending the next monday.

    var startDate = new Date(curr.setDate(first)).toISOString().split('T')[0];
    var endDate = new Date(curr.setDate(last)).toISOString().split('T')[0];
    this.setState({startDate, endDate})
    // console.log(firstday);
    // console.log(lastday);
    this.getWeeklyCreatorEvents(startDate, endDate);
  }

  setNextWeek() {
    let nextDate = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), this.state.selectedDate.getDate() + 7);
    nextDate.setHours(0, 0, 0, 0);
    this.setState({
      selectedDate: new Date(nextDate),
    }, () => {this.getWeeklyEvents();});
  }

  setPreviousWeek() {
    let previousDate = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), this.state.selectedDate.getDate() -7);
    previousDate.setHours(0, 0, 0, 0);
    this.setState({
      selectedDate: new Date(previousDate),
    }, () => {this.getWeeklyEvents();});
  }

  render() {
    const times: String[] = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1', minHeight: '400px', maxHeight: '400px', minWidth: '600px', marginTop: '10 px', borderColor: 'red', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'white' }} >
        <div style={{ display: 'flex', marginRight: "20px", borderBottom: 'solid', borderColor: 'black', flexDirection: 'row', }}>
          <div style={{ flex: '1' }}>
          <IconButton
            edge='end'
            onClick={() => {this.setPreviousWeek(); }}
          >
            <ArrowBack style = {{color: 'black'}}/>
          </IconButton>

          <IconButton
            edge='end'
            onClick={() => {this.setNextWeek()}}
          >
            <ArrowForward style = {{color: 'black'}}/>
          </IconButton>
          </div>
          <div className='HeaderCell'>
            <p style = {{marginTop: '-2px', marginBottom:'1px'}}>Monday</p>
            <p style = {{marginTop: '3px', marginBottom:'-10px'}}>{this.state.startDate}</p>
          </div>
          <div className='HeaderCell'>
            Tuesday
          </div>
          <div className='HeaderCell'>
            Wednesday
          </div>
          <div className='HeaderCell'>
            Thursday
          </div>
          <div className='HeaderCell'>
            Friday
          </div>
          <div className='HeaderCell'>
            Saturday
          </div>
          <div className='HeaderCell'>
            Sunday
          </div>
        </div>
        <div style={{ display: 'flex', overflowY: 'scroll' }}>
          <div className='GridBody' style={{ display: 'flex', minHeight: '1440px', maxHeight: '1440px', maxWidth:'790px', flexDirection: 'row', flex: '5' }}>
            <div className={'TimeColumn'}>
              {
                times.map((time, index) => (
                  <div key = {uuidv4()} className={'TimeCell'}>
                    {time}
                  </div>
                ))
              }

            </div>

              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>
                {
                this.state.creatorEvents.map((event, index) => (
                  <TimeBlock name = {event.name} key = {uuidv4()} height = {event.minutes} xinit = {97*event.dateIndex} yinit={event.startMinute} />
                ))
                }

                </div>
                {
                  times.map((time, index) => (
                    <div key = {uuidv4()} className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>

                </div>
                {
                  times.map((time, index) => (
                    <div key = {uuidv4()} className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>

                </div>
                {
                  times.map((time, index) => (
                    <div key = {uuidv4()} className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>

                </div>
                {
                  times.map((time, index) => (
                    <div key = {uuidv4()} className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>

                </div>
                {
                  times.map((time, index) => (
                    <div key = {uuidv4()} className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>

                </div>
                {
                  times.map((time, index) => (
                    <div key = {uuidv4()} className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>

                </div>
                {
                  times.map((time, index) => (
                    <div key = {uuidv4()} className={'BodyCell'}>
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

export default ScheduleGrid;

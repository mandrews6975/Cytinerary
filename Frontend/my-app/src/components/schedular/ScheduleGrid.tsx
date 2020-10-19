import * as React from 'react'
import { v4 as uuidv4 } from 'uuid';
import TimeBlock from './TimeBlock'
import '../../stylesheets/SchedularGrid.css'

interface IProps {
  //onSubmit: string,
  // visible: boolean,
  // onClose: () => void,
  // user: string,
}
interface IState {
  name: string,
  description: string,
  label: string,
}

class ScheduleGrid extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: '',
      description: '',
      label: ''
    }
  }

  componentDidMount() {
    //Include code for fetching the events based on the current week
    this.getWeeklyEvents();
  }

  getWeeklyCreatorEvents() {

  }

  getWeeklyParticipantEvents() {

  }

  getWeeklyEvents() {
    //Determine the first day and last day of the current week
    let d = new Date();
    // new Date().toISOString().slice(0, 19).replace('T', ' ');
    var days = ((d.getDay() + 7) - 1) % 7;
    d.setDate(d.getDate() - days);

    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    console.log(firstday.toString());
    console.log(lastday.toString());
  }


  render() {
    const times: String[] = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1', minHeight: '300px', maxHeight: '300px', minWidth: '600px', marginTop: '10 px', borderColor: 'red', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'white' }} >
        <div style={{ display: 'flex', marginRight: "20px", borderBottom: 'solid', borderColor: 'black', flexDirection: 'row', }}>
          <div style={{ flex: '1' }}>

          </div>
          <div className='HeaderCell'>
            Monday
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
                  <div className={'TimeCell'}>
                    {time}
                  </div>
                ))
              }

            </div>

              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>
                  <TimeBlock xinit = {388} yinit={600} />
                  <TimeBlock xinit = {0} yinit={630} />
                </div>
                {
                  times.map((time, index) => (
                    <div className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>
                  <TimeBlock xinit = {0} yinit={630} />
                </div>
                {
                  times.map((time, index) => (
                    <div className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>
                  <TimeBlock xinit = {0} yinit={630} />
                </div>
                {
                  times.map((time, index) => (
                    <div className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>
                  <TimeBlock xinit = {0} yinit={630} />
                </div>
                {
                  times.map((time, index) => (
                    <div className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>
                  <TimeBlock xinit = {0} yinit={630} />
                </div>
                {
                  times.map((time, index) => (
                    <div className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>
                  <TimeBlock xinit = {0} yinit={630} />
                </div>
                {
                  times.map((time, index) => (
                    <div className={'BodyCell'}>
                    </div>
                  ))
                }
              </div>
              <div className={'BodyColumn'}>
                <div className={'BodyCell'}>
                  <TimeBlock xinit = {0} yinit={630} />
                </div>
                {
                  times.map((time, index) => (
                    <div className={'BodyCell'}>
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

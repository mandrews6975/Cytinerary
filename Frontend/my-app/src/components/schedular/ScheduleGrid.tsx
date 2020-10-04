import * as React from 'react'
import { v4 as uuidv4 } from 'uuid';
import TimeBlock from './TimeBlock'

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
  }


  render() {
    const times: String[] = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1', overflow:'hidden', minHeight: '500px', maxHeight:'500px', minWidth: '600px', marginTop: '10 px', borderColor: 'red', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'white' }} >
        <div style={{ display: 'flex', flexDirection: 'row', borderColor: 'yellow', borderStyle: 'solid', borderWidth: '2px' }}>
          <div style={{ flex: '1' }}>

          </div>
          <div style={{ backgroundColor: 'green', flex: '1' }}>
            Monday
        </div>
          <div style={{ backgroundColor: 'yellow', flex: '1' }}>
            Tuesday
        </div>
          <div style={{ backgroundColor: 'orange', flex: '1' }}>
            Wednesday
        </div>
          <div style={{ backgroundColor: 'red', flex: '1' }}>
            Thursday
        </div>
          <div style={{ backgroundColor: 'black', flex: '1' }}>
            Friday
        </div>
          <div style={{ backgroundColor: 'pink', flex: '1' }}>
            Saturday
        </div>
          <div style={{ backgroundColor: 'turquoise', flex: '1' }}>
            Sunday
        </div>
        </div>
        <div style={{ display: 'flex', overflowY: 'auto', flexDirection: 'row', flex: '5' }}>
          <div style={{ backgroundColor: 'blue', flex: '1' }}>
            {
              times.map((time, index) => (
                <p key = {index}>{time}</p>
              ))
            }

          </div>
          <div style={{ backgroundColor: 'green', flex: '1' }}> <TimeBlock yinit= {50}/></div>
          <div style={{ backgroundColor: 'yellow', flex: '1' }}> </div>
          <div style={{ backgroundColor: 'orange', flex: '1' }}> </div>
          <div style={{ backgroundColor: 'red', flex: '1' }}> </div>
          <div style={{ backgroundColor: 'black', flex: '1' }}> </div>
          <div style={{ backgroundColor: 'pink', flex: '1' }}> </div>
          <div style={{ backgroundColor: 'turquoise', flex: '1' }}> </div>
        </div>
      </div>
    );
  }
}

export default ScheduleGrid;

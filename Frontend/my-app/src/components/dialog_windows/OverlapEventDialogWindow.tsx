import * as React from 'react'
import { Dialog, DialogTitle, DialogContent, Button} from '@material-ui/core/';
var dateFormat = require('dateformat');


/**
 * This interface defines the props used in this OverlapEventDialogWindow component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface IProps {

  /**
   * This prop is used to determine if the component is visible or not
   */
  visible: boolean,

  /**
   * This is the eventId for which the component will display information on
   */
  eventId: string,

  /**
   * This function will be executed when the component closes
   */
  onClose: () => void,
}


/**
 * This interface defines the various state variable used in this OverlapEventDialogWindow component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface IState {
  /**
 * This is the name of the displayed event
 */
  name: string,
  /**
 * This is the description of the displayed event
 */
  description: string,

  /**
   * This is the netId of the user who created the displayed event
   */
  creatorNetId: string,

  /**
   * This is the first name of the user who creadted the displayed event
   */
  creatorFirstName: string,

  /**
   * This is the last name of the user who created the displayed event
   */
  creatorLastName: string,

  /**
 * This is a string that represents the date and time that an event starts from
 */
  fromDate: string,
  /**
 * This is a string that represents the date and time that an event goes to
 */
  toDate: string,
}


/**
 * This is the OverlapEventDialogWindow component displayed in the ScheduleOverlapScreen on event clicks
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
class OverlapEventDialogWindow extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: '',
      description: '',
      creatorNetId: '',
      creatorFirstName: '',
      creatorLastName: '',
      fromDate: '',
      toDate: '',
    }
  }

  componentDidUpdate(prevProps) {
    // Check to see if the userId array  prop was updated
    if (this.props.eventId !== prevProps.eventId) {
      this.getEventInfo();
    }
  }


  /**
   * getEventInfo - This method retrieves event info given a particular eventId
   */
  getEventInfo() {
    if (this.props.eventId !== '') {
      try {
        fetch('/getEventWithId', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: this.props.eventId
          }),
        }).then((response) => response.json())
          .then((json) => {
            if(json.length > 0){
            this.setState({
              name: json[0].name,
              description: json[0].description,
              fromDate: json[0].startTime,
              toDate: json[0].endTime,
            })
            this.getUserName(json[0].creator)
          }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }


  /**
   * getUserName - This method retrieves info for the user who created the displayed event
   *
   * @param userId : This is the userId of the user who created the displayed event
   */
  getUserName(userId : string) {
      try {
        fetch('/getUser', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserId: userId
          }),
        }).then((response) => response.json())
          .then((json) => {
            if(json.length > 0){
            this.setState({
              creatorNetId: json[0].netId,
              creatorFirstName: json[0].firstName,
              creatorLastName: json[0].lastName,
            })
          }
          });
      } catch (err) {
        console.log(err);
      }
  }

  /**
 * This method renders and returns the jsx body of this component
 * @return The contents of this jsx component
 */
  render() {
    return(
      <div>
        <Dialog maxWidth = {'md'} open = {this.props.visible} onBackdropClick = {() => {this.props.onClose()}}>
          <DialogTitle>{this.state.name}</DialogTitle>
              <DialogContent>
                <div style = {{flexDirection: 'column', }}>
                  <div style = {{marginBottom: '5px'}}>
                    Created by {this.state.creatorFirstName} {this.state.creatorLastName}, {this.state.creatorNetId}@iastate.edu
                  </div>
                  <div style = {{marginBottom: '5px'}}>
                    Description: {this.state.description}
                  </div>
                  <div style = {{marginBottom: '5px'}}>
                    From: {dateFormat(this.state.fromDate, 'dddd, mmmm dS, yyyy, h:MM TT')}
                  </div>
                  <div style = {{marginBottom: '5px'}}>
                    To: {dateFormat(this.state.toDate, 'dddd, mmmm dS, yyyy, h:MM TT')}
                  </div>
                  <div style = {{marginBottom: '5px', display:'flex',justifyContent:'flex-end' }}>
                    <div style = {{}}>
                      <Button onClick = {() => {this.props.onClose()}} style = {{color:'black'}}>Close</Button>
                    </div>
                  </div>
              </div>
            </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default OverlapEventDialogWindow;

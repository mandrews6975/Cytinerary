import * as React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField, NativeSelect, List } from '@material-ui/core/';
import { v4 as uuidv4 } from 'uuid';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import LabelDialogEventListItem from '../list_items/LabelDialogEventListItem';


interface IProps {
  //onSubmit: string,
  /**
 * This represents whether or not the function should be visible to the user
 * @author Vincent Woodward
 */
  visible: boolean,
  /**
 * onClose is a function that defines what should be done when the component closes
 * @author Vincent Woodward
 */
  onClose: () => void,
  /**
 * This is the userId for a given event
 * @author Vincent Woodward
 */
  userId: string,
  /**
 * This is a function that defines what should be done on a successful submit
 * @author Vincent Woodward
 */
  onSuccessfulSubmit: Function,
}
interface IState {
  /**
 * Name of an event
 * @author Vincent Woodward
 */
  name: string,
  /**
 * Description of an event
 * @author Vincent Woodward
 */
  description: string,
  /**
 * Label for an event
 * @author Vincent Woodward
 */
  label: string,
  /**
 * This is an array of variables for labels
 * @author Vincent Woodward
 */
  allLabels: {userId: string, label: string, color: string}[];
  /**
 * This is a string that represents the date and time that an event starts from
 * @author Vincent Woodward
 */
  fromDate: string,
  /**
 * This is a string that represents the date and time that an event goes to
 * @author Vincent Woodward
 */
  toDate: string,
    /**
 * This is a flag that respresents whether or not the dialog window should be open for the user.
 * @author Vincent Woodward
 */
  labelDialog: boolean,
    /**
 * This is a flag that represents whether or not the emptyFieldMessage should be visible to the user.
 * @author Vincent Woodward
 */
  emptyFieldMessageVisible: boolean,
      /**
 * This is a flag that represents whether or not the participant dialog should be visible to the user.
 * @author Vincent Woodward
 */
  participantsDialogVisible: boolean,
      /**
 * This is a flag that represents whether or not to display an error
 * @author Vincent Woodward
 */
  participantsError: boolean,
      /**
 * This is an array of strings representing the participants of a given event.
 * @author Vincent Woodward
 */
  participants: string[],
      /**
 * This is a string of the participants net ids
 * @author Vincent Woodward
 */
  participantsNetIds: string,
      /**
 * This is the participants 'value'
 * @author Vincent Woodward
 */
  participantValue: string,
/**
 * This is a string for an error for the label for participants
 * @author Vincent Woodward
 */
  participantsErrorLabel : string,
}

class NewEventModal extends React.Component<IProps, IState> {

  componentDidMount() { this.getEventLabels(this.props.userId) }

  constructor(props: IProps) {
    super(props);
    this.state = {
      name: '',
      description: '',
      label: '',
      fromDate: this.getLocalTimeStampString( new Date()),
      toDate: this.getLocalTimeStampString( new Date()),
      allLabels: [],
      labelDialog: false,
      emptyFieldMessageVisible: false,
      participantsDialogVisible: false,
      participantsError: false,
      participants: [],
      participantsNetIds: '',
      participantValue: '',
      participantsErrorLabel: '',
    }
  }

/**
 * Submit, submits a new event and sends the data to the backend
 * @author Vincent Woodward
 */
  submit() {
    if(this.state.name === '' || this.state.description === '') {
      this.setState({
        emptyFieldMessageVisible: true,
      })
    }
    else {
      let eventId: string = uuidv4();
      try {
        fetch('/createEvent', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              eventId: eventId,
              creator: this.props.userId,
              name: this.state.name,
              description: this.state.description,
              startTime: this.state.fromDate, /*There is an inconsistency with the naming scheme here (startTime and fromDate)*/
              endTime: this.state.toDate,
              label: this.state.label,
            }),
        }).then((response) => {
          this.props.onSuccessfulSubmit();
          //Add each participant once the event has been created
          for(let userId of this.state.participants) {
            console.log(userId);
            try {
              fetch('/addParticipant', {
                method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    eventId: eventId,
                    participant: userId,
                  }),
              }).then((response) => {this.props.onSuccessfulSubmit();})
            }
            catch(err) {
              console.log(err)
            }
          }
          this.closeModal();
        });
      }
      catch(err) {
        console.log(err);
      }
    }
  }
  /**
 * This resets everything for when a component is closed
 * @author Vincent Woodward
 */
  closeModal() {
    //Ensure that all fields are reset
    this.setState({
      allLabels: [],
      labelDialog:false,
      participants: [],
      participantsNetIds: '',
      emptyFieldMessageVisible: false,
      participantsError: false,
      participantsErrorLabel: '',
      participantValue: '',
      name: '',
      description: '',
      label: '',
    })
    this.props.onClose();
  }

/**
 * Converts a date to the local time
 * 
 * @param date is a given date
 * @return isoDateTime
 * @author Vincent Woodward
 */
  getLocalTimeStampString(date: Date) : string {
    var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T', ' ');
    return isoDateTime;
  }

/**
 * This adds a participant to an event
 * @author Vincent Woodward
 */
  addParticipant() {
    //Check if user trys to add themselves
    if(this.state.participantValue === this.props.userId) {
      this.setState({
        participantsError:true,
        participantsErrorLabel: 'You cannot be the participant of the event',
      })
    }
    else {
      fetch('/userExists', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            netId: this.state.participantValue,
          }),
      }).then((response) => response.json())
      .then((json) => {
        let participants : string[] = this.state.participants!;
        let participantsNetIds = this.state.participantsNetIds!;
        if(json[0]) {
          //Check if the new participant was already a participant in the list
          if(this.state.participants.includes(json[0].userId)) {
            this.setState({
              participantsError:true,
              participantsErrorLabel: 'You cannot add duplicated participants',
            })
          }
          //Add the new participant, reset and error messages
          else {
            participants.push(json[0].userId)
            participantsNetIds += json[0].netId + ', '
            this.setState({
              participants,
              participantsNetIds,
              participantsErrorLabel: '',
              participantValue: '',
              participantsError:false,});
          }
        }
        else {
          this.setState({
            participantsError:true,
            participantsErrorLabel: 'User does not exist',
          })
        }
      });
    }
  }

/**
 * This gets the event labels with a userId
 * 
 * @param userId
 * @author Vincent Woodward
 */
  getEventLabels(userId: string)
  {
    try {
      fetch('/getLabels', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId
        }),
      }).then((response) => response.json())
        .then((json) => {
          let instanceLabel: { userId: string, label: string, color: string }[] = [];
          json.forEach((label: { userId: string, label: string, color: string} ) => {
            instanceLabel.push({
              userId: label.userId,
              label: label.label,
              color: label.color
            });
          });
          this.setState({
            allLabels: instanceLabel
          });
          console.log(this.state.allLabels)
        });
    } catch (err) {
      console.log(err);
    }
  }

/**
 * Handles the event that a 'from' date changes 
 * 
 * @param e is an event 
 * @author Vincent Woodward
 */
  handleFromDateChange(e) {
    try {
      this.setState({fromDate: this.getLocalTimeStampString(e)});
    }
    catch(err) {
    }
  }

/**
 * Handles the event that a 'to' date changes 
 * 
 * @param e is an event 
 * @author Vincent Woodward
 */
  handleToDateChange(e) {
    try {
      this.setState({toDate: this.getLocalTimeStampString(e)});
    }
    catch(err) {
    }
  }

  /**
 * Renders the component
 * 
 * @return the component
 * @author Vincent Woodward
 */
  render() {
    return(
      <div>
        <Dialog maxWidth = {'md'} open = {this.props.visible} onBackdropClick = {() => {this.closeModal()}}>
          <DialogTitle>Create an event</DialogTitle>
              <DialogContent>
                {this.state.emptyFieldMessageVisible && <text style = {{color:'red'}} >Required: Name and Description</text> }
                <div style = {{flexDirection: 'column', }}>
                  <div style = {{display: 'flex'}}> <TextField error = {this.state.emptyFieldMessageVisible && (this.state.name === '')} id = "nameInput" label = "Name" onChange = {(e) => {this.setState({name: e.target.value})}} variant="outlined"/> </div>
                  <div style = {{display: 'flex'}}> <TextField error = {this.state.emptyFieldMessageVisible && (this.state.description === '')} id = "descriptionInput" label = "Description" onChange={(e) => {this.setState({description: e.target.value})}} variant="outlined"/> </div>
                  <div id = "time-selector">
                    {/*TODO: Check if the to and from dates make sense, you don't want the to date to be before the from date*/}
                    {/*MySQL date time format YYYY-MM-DD hh:mm:ss*/}
                    {/*In the onChange part of the KeyboardDateTimePicker component, the ! might cause problems down the line. The ! ignores the fact that it could be null.*/}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <text>Starting:</text>
                      <KeyboardDateTimePicker fullWidth format="yyyy-MM-dd hh:mm:ss a" margin="normal" value={this.state.fromDate} onChange={(e) => {
                        this.handleFromDateChange(e);
                      }}/>
                      <text>Ending:</text>
                      <KeyboardDateTimePicker fullWidth format="yyyy-MM-dd hh:mm:ss a" margin="normal" value={this.state.toDate} onChange={(e) => {
                        this.handleToDateChange(e);
                      }}/>
                    </MuiPickersUtilsProvider>
                  </div>
                  <div style = {{display: 'flex'}}>
                    <Button variant="outlined" onClick = {() => {this.getEventLabels(this.props.userId); this.setState({labelDialog:true})}}>
                      Label: {this.state.label}
                    </Button>
                  </div>
                  <div>
                    <Dialog open={this.state.labelDialog} onClose={() => this.setState({labelDialog:false})}>
                      <DialogTitle>Choose existing label</DialogTitle>
                      <DialogContent>
                      <div
                        style={{
                          overflowY: 'scroll',
                          height: window.innerHeight * 0.26,
                          flex: 1
                        }}
                      >
                          <List>
                            {this.state.allLabels.map((
                              person: {userId:string, label:string, color:string}
                            ) => (
                                <LabelDialogEventListItem
                                  label={person.label}
                                  color={person.color}
                                  onClick={() => {
                                    this.setState({label:person.label});
                                    this.setState({labelDialog:false})
                                  }}
                                />
                            ))}
                          </List>
                        </div>
                        <Button onClick={() => { console.log(this.state.allLabels); this.setState({labelDialog:false})}}>
                          Back
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div>
                    <text>Participants: {this.state.participantsNetIds}</text>
                    <TextField error = {this.state.participantsError} value={this.state.participantValue} helperText= {this.state.participantsErrorLabel} label = "Participant" id = "participantInput" onChange={(e) => {this.setState({participantValue: e.target.value})}} variant="outlined"/>
                    <Button onClick = {() => {this.addParticipant()}}> Add Participant</Button>
                  </div>
                  <div>
                  <Button onClick = {() => {this.closeModal()}} style = {{color:'black'}}>Cancel</Button>
                  <Button onClick = {() => {this.submit()}} style = {{color:'black'}}>Create</Button>
                  </div>
              </div>
            </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default NewEventModal;
